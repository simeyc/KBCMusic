import React, { FC, useEffect } from 'react';
import SongsList from './components/SongsList';
import useSongs from './components/useSongs';
import RNBootSplash from 'react-native-bootsplash';

const App: FC = () => {
    const songsController = useSongs();
    useEffect(() => {
        songsController
            .fetchSongs()
            .finally(() => RNBootSplash.hide({ duration: 250 }));
    }, []);
    return <SongsList songsController={songsController} />;
};

export default App;
