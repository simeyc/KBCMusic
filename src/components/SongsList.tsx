import React, { FC, useState, useRef, useEffect } from 'react';
import {
    View,
    SectionList,
    TouchableNativeFeedback,
    Text,
    Clipboard,
    ToastAndroid
} from 'react-native';
import SongItem from './SongItem';
import HeaderArea from './HeaderArea';
import TitleBar from './TitleBar';
import SearchBar from './SearchBar';
import { colors, fontSizes } from '../constants';
import { SongsDB, SongsController } from '../types';
import SeparatorLine from './SeparatorLine';
import PlaceholderView from './PlaceholderView';

interface SongsListProps {
    songsController: SongsController;
}

const SongsList: FC<SongsListProps> = ({ songsController }) => {
    const [filter, setFilter] = useState<string>(''),
        [filterMode, setFilterMode] = useState<boolean>(false),
        [songsData, setSongsData] = useState(songsController.songs),
        toggleFilterMode = () => setFilterMode(!filterMode),
        listRef = useRef(null);

    useEffect(() => {
        let newSongsData: SongsDB = [];
        if (!filterMode) {
            newSongsData = songsController.songs;
        } else if (!!filter) {
            const filterRegex = new RegExp(
                    `(^|[ -])${filter
                        .split(/[ -]/)
                        .map(word => word.split('').join('[^a-zA-Z0-9 -]*'))
                        .join('[^a-zA-Z0-9 -]*[ \\-][^a-zA-Z0-9 -]*')}`,
                    'i'
                ),
                filterIsNumber = /^[1-9][0-9]*$/.test(filter);
            newSongsData = songsController.songs
                .map(section => ({
                    title: section.title,
                    data: section.data.filter(
                        song =>
                            (filterIsNumber &&
                                song.number.toString() === filter) ||
                            filterRegex.test(song.title) ||
                            (!!song.altTitle && filterRegex.test(song.altTitle))
                    )
                }))
                .filter(section => section.data.length > 0);
        }
        setSongsData(newSongsData);
    }, [filter, filterMode, songsController.songs]);

    useEffect(() => {
        if (songsData.length > 0) {
            listRef.current.scrollToLocation({
                sectionIndex: 0,
                itemIndex: 0
            });
        }
    }, [songsData]);

    return (
        <>
            <HeaderArea>
                {!!filterMode ? (
                    <SearchBar
                        onClose={() => {
                            setFilter('');
                            toggleFilterMode();
                        }}
                        onChangeFilter={setFilter}
                    />
                ) : (
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
                )}
            </HeaderArea>
            {songsData.length > 0 ? (
                <SectionList
                    ref={listRef}
                    {...(songsController.loading && {
                        style: { opacity: 0.5 },
                        refreshing: true
                    })}
                    renderItem={({ item, section }) => (
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple(
                                colors.LIGHT_GREY
                            )}
                            onPress={() => {
                                songsData;
                                Clipboard.setString(
                                    `*${
                                        section.titleAbbr
                                    } ${item.number.toString()}* ${item.title}`
                                );
                                ToastAndroid.show(
                                    `"${
                                        section.titleAbbr
                                    } ${item.number.toString()} ${
                                        item.title
                                    }" copied to clipboard`,
                                    ToastAndroid.SHORT
                                );
                                console.log(`clicked: "${item.title}"`);
                            }}>
                            <View style={{ backgroundColor: colors.WHITE }}>
                                <SongItem data={item} filter={filter} />
                            </View>
                        </TouchableNativeFeedback>
                    )}
                    renderSectionHeader={({ section: { title, data } }) => (
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: fontSizes.MEDIUM,
                                backgroundColor: colors.LIGHT_GREY,
                                color: colors.GREY,
                                padding: 5,
                                paddingLeft: 10
                            }}>
                            {!filter
                                ? title
                                : `${title} (${data.length.toString()} result` +
                                  (data.length === 1 ? ')' : 's)')}
                        </Text>
                    )}
                    sections={songsData}
                    keyExtractor={item => String(item.key)}
                    ItemSeparatorComponent={SeparatorLine}
                    {...(songsData.length > 0 && {
                        ListFooterComponent: SeparatorLine
                    })}
                    stickySectionHeadersEnabled={true}
                />
            ) : !!filter ? (
                <PlaceholderView text="No results found" iconName="md-sad" />
            ) : null}
        </>
    );
};

export default SongsList;
