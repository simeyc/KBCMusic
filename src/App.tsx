import React, { FC, useState, useEffect } from 'react';
import SongsList from './components/SongsList';
import { ToastAndroid } from 'react-native';
import useSongs from './components/useSongs';
import AsyncStorage from '@react-native-community/async-storage';
import { storageKeys, STORAGE_VERSION } from './constants';

const App: FC = () => {
    const songsController = useSongs(),
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
        };
    useEffect(() => {
        setupStorage();
    }, []);
    return <SongsList songsController={songsController} />;
};

export default App;
