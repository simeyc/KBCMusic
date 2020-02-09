import React, { FC, useState, useEffect } from 'react';
import SongsList from './components/SongsList';
import { ToastAndroid } from 'react-native';
import { SongsDB } from './types';

const App: FC = () => {
    const [songsDB, setSongsDB] = useState<SongsDB>([]);
    useEffect(() => {
        fetch(
            'https://github.com/simeyc/KBCMusic/raw/master/public/songsDB.json'
        )
            .then(response => response.json())
            .then(data => {
                setSongsDB(data);
                ToastAndroid.show(
                    'Songs database is up to date!',
                    ToastAndroid.SHORT
                );
            })
            .catch(() => {
                ToastAndroid.show(
                    'Failed to fetch songs database!',
                    ToastAndroid.LONG
                );
            });
    }, []);
    return <SongsList songsDB={songsDB} />;
};

export default App;
