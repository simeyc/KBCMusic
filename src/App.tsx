import React, { FC, useState, useEffect } from 'react';
import SongsList from './components/SongsList';
import { ToastAndroid } from 'react-native';
import { SongsDB } from './types';
import AsyncStorage from '@react-native-community/async-storage';
import { storageKeys, STORAGE_VERSION } from './constants';

const App: FC = () => {
    const [songsDB, setSongsDB] = useState<SongsDB>([]),
        setupStorage = async () => {
            try {
                const storageVersion = await AsyncStorage.getItem(
                    storageKeys.STORAGE_VERSION
                );
                if (storageVersion !== STORAGE_VERSION) {
                    if (storageVersion !== null) {
                        // TODO: perform migration to new storage version
                    }
                    await AsyncStorage.setItem(
                        storageKeys.STORAGE_VERSION,
                        STORAGE_VERSION
                    );
                }
            } catch (e) {
                ToastAndroid.show(
                    'Warning: persistent storage error!',
                    ToastAndroid.LONG
                );
            }
        },
        loadSongsDB = async () => {
            let data = null;
            try {
                data = await AsyncStorage.getItem(storageKeys.SONGS_DB);
            } catch (e) {
                ToastAndroid.show(
                    'Failed to load data from storage.',
                    ToastAndroid.LONG
                );
            }
            return data !== null ? data : '[]';
        },
        storeSongsDB = async (data: string) => {
            try {
                await AsyncStorage.setItem(storageKeys.SONGS_DB, data);
            } catch (e) {
                ToastAndroid.show(
                    'Failed to save data to storage.',
                    ToastAndroid.LONG
                );
            }
        };
    useEffect(() => {
        setupStorage();
        fetch(
            'https://github.com/simeyc/KBCMusic/raw/master/public/songsDB.json'
        )
            .then(response => response.json())
            .then(data => {
                // if new DB differs from storage, overwrite storage
                loadSongsDB().then(oldData => {
                    const newData = JSON.stringify(data);
                    if (newData !== oldData) {
                        storeSongsDB(newData);
                    }
                });
                setSongsDB(data);
                ToastAndroid.show('Data is up to date!', ToastAndroid.SHORT);
            })
            .catch(() => {
                loadSongsDB().then(data => {
                    setSongsDB(JSON.parse(data));
                });
                ToastAndroid.show(
                    'Failed to fetch updates. Data may be out-of-date!',
                    ToastAndroid.LONG
                );
            });
    }, []);
    return <SongsList songsDB={songsDB} />;
};

export default App;
