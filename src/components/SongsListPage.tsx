import React, { FC, useState } from 'react';
import TitleBar from './TitleBar';
import LoadingOverlayModal from './LoadingOverlayModal';
import { SongsController } from '../types';
import SongsList from './SongsList';
import SearchModal from './SearchModal';

interface SongsListPageProps {
    songsController: SongsController;
}

const SongsListPage: FC<SongsListPageProps> = ({ songsController }) => {
    const [filterMode, setFilterMode] = useState<boolean>(false),
        toggleFilterMode = () => setFilterMode(!filterMode);

    return (
        <>
            <TitleBar
                title="KBC Music"
                actions={[
                    {
                        name: 'Sync',
                        icon: 'md-sync',
                        callback: songsController.fetchSongs
                    },
                    {
                        name: 'Search',
                        icon: 'md-search',
                        callback: toggleFilterMode
                    }
                ]}
            />
            <SongsList songs={songsController.songs} />
            {filterMode && (
                <SearchModal
                    songs={songsController.songs}
                    onClose={toggleFilterMode}
                />
            )}
            {songsController.loading && <LoadingOverlayModal />}
        </>
    );
};

export default SongsListPage;
