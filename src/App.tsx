import React, { FC, useEffect } from 'react';
import SongsListPage from './components/SongsListPage';
import useSongs from './components/useSongs';
import RNBootSplash from 'react-native-bootsplash';

const App: FC = () => {
    const songsController = useSongs();
    useEffect(() => {
        const hideSplash = () => RNBootSplash.hide({ duration: 250 });
        // persist splash until after fetch if storage empty
        songsController
            .loadSongs()
            .then(result => result && hideSplash())
            .finally(() =>
                songsController.fetchSongs().finally(() => hideSplash())
            );
    }, []);
    return <SongsListPage songsController={songsController} />;
};

export default App;
