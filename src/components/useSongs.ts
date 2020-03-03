import { useState } from 'react';
import { SongsController, SongsDB } from '../types';
import { storageKeys } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { ToastAndroid, Alert } from 'react-native';

const useSongs: () => SongsController = () => {
    const [loading, setLoading] = useState(true),
        [songs, setSongs] = useState<SongsDB>([]),
        fetchSongs = () => {
            setLoading(true);
            return fetch(
                'https://github.com/simeyc/KBCMusic/raw/master/public/api_v1/songsDB.json'
            )
                .then(response => response.json())
                .then(data => {
                    const newData = JSON.stringify(data);
                    if (newData !== JSON.stringify(songs)) {
                        AsyncStorage.setItem(storageKeys.SONGS_DB, newData);
                        setSongs(data);
                    }
                    ToastAndroid.show(
                        'Songs are up to date!',
                        ToastAndroid.SHORT
                    );
                })
                .catch(() => {
                    Alert.alert(
                        'Network error',
                        'Failed to fetch songs. Songs may be out of date!'
                    );
                })
                .finally(() => setLoading(false));
        },
        loadSongs = () =>
            AsyncStorage.getItem(storageKeys.SONGS_DB).then(data => {
                !!data && setSongs(JSON.parse(data));
                return !!data;
            });
    return {
        loading: loading,
        songs: songs,
        fetchSongs: fetchSongs,
        loadSongs: loadSongs
    };
};

export default useSongs;
