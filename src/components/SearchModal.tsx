import React, { FC, useState, useRef } from 'react';
import { Modal, View } from 'react-native';
import SearchBar from './SearchBar';
import { SongsDB } from '../types';
import SongsList from './SongsList';
import { colors } from '../constants';
import escaperegexp from 'lodash.escaperegexp';

interface SearchModalProps {
    songs: SongsDB;
    onClose: () => void;
}

const SearchModal: FC<SearchModalProps> = ({ songs, onClose }) => {
    const [filter, setFilter] = useState(''),
        [filteredSongs, setFilteredSongs] = useState<SongsDB>([]),
        onChangeFilter = (text: string) => {
            let newSongsData: SongsDB = [];
            if (!!text) {
                const filterRegex = new RegExp(
                        `(^|[ -])${text
                            .split(/[ -]/)
                            .map(word =>
                                word
                                    .split('')
                                    .map(char => escaperegexp(char))
                                    .join('[^a-zA-Z0-9 -]*')
                            )
                            .join('[^a-zA-Z0-9 -]*[ \\-][^a-zA-Z0-9 -]*')}`,
                        'i'
                    ),
                    filterIsNumber = /^[1-9][0-9]*$/.test(text);
                newSongsData = songs
                    .map(section => ({
                        title: section.title,
                        titleAbbr: section.titleAbbr,
                        data: section.data.filter(
                            song =>
                                (filterIsNumber &&
                                    song.number.toString() === text) ||
                                filterRegex.test(song.title) ||
                                (!!song.altTitle &&
                                    filterRegex.test(song.altTitle))
                        )
                    }))
                    .filter(section => section.data.length > 0);
            }
            setFilter(text);
            setFilteredSongs(newSongsData);
        },
        inputRef = useRef(null);

    return (
        <Modal
            animationType="fade"
            visible
            transparent
            onRequestClose={onClose}
            onShow={() => {
                inputRef.current.focus();
            }}>
            <View style={{ flex: 1, backgroundColor: colors.VERY_LIGHT_GREY }}>
                <SearchBar
                    inputRef={inputRef}
                    onUpdateText={onChangeFilter}
                    onClose={onClose}
                />
                <SongsList songs={filteredSongs} filter={filter} />
            </View>
        </Modal>
    );
};

export default SearchModal;
