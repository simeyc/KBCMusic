import React, { FC, useState } from 'react';
import TitleBar from './TitleBar';
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
                        name: 'Search',
                        icon: 'md-search',
                        onClick: toggleFilterMode
                    }
                ]}
            />
            <SongsList
                songs={songsController.songs}
                loading={songsController.loading}
                onRefresh={songsController.fetchSongs}
            />
            {filterMode && (
                <SearchModal
                    songs={songsController.songs}
                    onClose={toggleFilterMode}
                />
            )}
        </>
    );
};

export default SongsListPage;
