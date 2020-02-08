import React, { FC, useState, useRef, useEffect } from 'react';
import { View, SectionList, TouchableNativeFeedback, Text } from 'react-native';
import SongItem from './SongItem';
import songsDB from '../songsDB';
import HeaderArea from './HeaderArea';
import TitleBar from './TitleBar';
import SearchBar from './SearchBar';
import { colors, fontSizes } from '../constants';
import Icon from 'react-native-ionicons';
import { SongsDB } from '../types/SongData';

const SeparatorLine = () => (
        <View
            style={{
                height: 1,
                backgroundColor: colors.LIGHT_GREY
            }}
        />
    ),
    SongsList: FC = () => {
        const [filter, setFilter] = useState<string>(''),
            [filterMode, setFilterMode] = useState<boolean>(false),
            [songsData, setSongsData] = useState(songsDB),
            toggleFilterMode = () => setFilterMode(!filterMode),
            listRef = useRef(null);

        useEffect(() => {
            let newSongsData: SongsDB = [];
            if (!filterMode) {
                newSongsData = songsDB;
            } else if (!!filter) {
                const filterRegex = new RegExp(
                        `(^|[ -])${filter
                            .split(/[ -]/)
                            .map(word => word.split('').join('[^a-zA-Z0-9 -]*'))
                            .join('[^a-zA-Z0-9 -]*[ \\-][^a-zA-Z0-9 -]*')}`,
                        'i'
                    ),
                    filterIsNumber = /^[1-9][0-9]*$/.test(filter);
                newSongsData = songsDB
                    .map(section => ({
                        title: section.title,
                        data: section.data.filter(
                            song =>
                                (filterIsNumber &&
                                    song.number.toString() === filter) ||
                                filterRegex.test(song.title) ||
                                (!!song.altTitle &&
                                    filterRegex.test(song.altTitle))
                        )
                    }))
                    .filter(section => section.data.length > 0);
            }
            setSongsData(newSongsData);
        }, [filter, filterMode]);

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
                                    name: 'Search',
                                    icon: 'md-search',
                                    callback: toggleFilterMode
                                }
                            ]}
                        />
                    )}
                </HeaderArea>
                <SectionList
                    ref={listRef}
                    renderItem={({ item }) => (
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple(
                                colors.LIGHT_GREY
                            )}
                            onPress={() =>
                                console.log(`clicked: "${item.title}"`)
                            }>
                            <View style={{ backgroundColor: colors.WHITE }}>
                                <SongItem data={item} filter={filter} />
                            </View>
                        </TouchableNativeFeedback>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: fontSizes.MEDIUM,
                                backgroundColor: colors.LIGHT_GREY,
                                color: colors.GREY,
                                padding: 5,
                                paddingLeft: 10
                            }}>
                            {title}
                        </Text>
                    )}
                    sections={songsData}
                    keyExtractor={item => String(item.key)}
                    ItemSeparatorComponent={SeparatorLine}
                    {...(songsData.length > 0 && {
                        ListFooterComponent: SeparatorLine
                    })}
                    stickySectionHeadersEnabled={true}
                    ListEmptyComponent={
                        <View
                            style={{
                                alignItems: 'center',
                                paddingTop: 20
                            }}>
                            <Icon
                                name="md-sad"
                                size={fontSizes.HUGE}
                                color={colors.GREY}
                            />
                            <Text
                                style={{
                                    color: colors.GREY,
                                    fontSize: fontSizes.MEDIUM_LARGE,
                                    fontWeight: 'bold'
                                }}>
                                No songs found
                            </Text>
                        </View>
                    }
                />
            </>
        );
    };

export default SongsList;
