import { useState, useEffect } from 'react';
import { SongsController, SongsDB } from '../types';
import { storageKeys } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { ToastAndroid } from 'react-native';

const useSongs: () => SongsController = () => {
    const [loading, setLoading] = useState(true),
        [songs, setSongs] = useState<SongsDB>([]),
        storeSongs = async (data: string) => {
            try {
                await AsyncStorage.setItem(storageKeys.SONGS_DB, data);
            } catch (e) {
                ToastAndroid.show(
                    'Failed to save songs to storage.',
                    ToastAndroid.LONG
                );
            }
        },
        loadSongs = async () => {
            let data = null;
            try {
                data = await AsyncStorage.getItem(storageKeys.SONGS_DB);
            } catch (e) {
                ToastAndroid.show(
                    'Failed to load songs from storage.',
                    ToastAndroid.LONG
                );
            }
            return data !== null ? data : '[]';
        },
        fetchSongs = () => {
            setLoading(true);
            fetch(
                'https://github.com/simeyc/KBCMusic/raw/master/public/songsDB.json'
            )
                .then(response => response.json())
                .then(data => {
                    // if new DB differs from storage, overwrite storage
                    loadSongs().then(oldData => {
                        const newData = JSON.stringify(data);
                        if (newData !== oldData) {
                            storeSongs(newData);
                        }
                    });
                    setSongs(data);
                    ToastAndroid.show(
                        'Songs are up to date!',
                        ToastAndroid.LONG
                    );
                })
                .catch(() => {
                    loadSongs().then(data => {
                        setSongs(JSON.parse(data));
                    });
                    ToastAndroid.show(
                        'Failed to fetch updates. Songs may be out of date!',
                        ToastAndroid.LONG
                    );
                })
                .finally(() => setLoading(false));
        };
    useEffect(() => {
        fetchSongs();
    }, []);
    return {
        loading: loading,
        songs: songs,
        fetchSongs: fetchSongs
    };
};

export default useSongs;
