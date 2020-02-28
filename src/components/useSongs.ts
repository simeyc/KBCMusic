import { useState } from 'react';
import { SongsController, SongsDB } from '../types';
import { storageKeys } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { ToastAndroid, Alert } from 'react-native';

const useSongs: () => SongsController = () => {
    const [loading, setLoading] = useState(true),
        [songs, setSongs] = useState<SongsDB>([]),
        storeSongs = async (data: string) => {
            try {
                await AsyncStorage.setItem(storageKeys.SONGS_DB, data);
            } catch (e) {}
        },
        loadSongs = async () => {
            let data = null;
            try {
                data = await AsyncStorage.getItem(storageKeys.SONGS_DB);
            } catch (e) {}
            return data !== null ? data : '[]';
        },
        fetchSongs = () => {
            setLoading(true);
            return fetch(
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
                    Alert.alert(
                        'Network error',
                        'Failed to fetch songs. Songs may be out of date!'
                    );
                })
                .finally(() => setLoading(false));
        };
    return {
        loading: loading,
        songs: songs,
        fetchSongs: fetchSongs
    };
};

export default useSongs;
