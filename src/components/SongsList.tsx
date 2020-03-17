import React, { FC, useRef, useEffect } from 'react';
import {
    SectionList,
    TouchableNativeFeedback,
    Clipboard,
    ToastAndroid,
    RefreshControl,
    View
} from 'react-native';
import SongItem from './SongItem';
import { useComponentHeights } from './ComponentHeights';
import { colors } from '../constants';
import { SongsDB } from '../types';
import SeparatorLine from './SeparatorLine';
import PlaceholderView from './PlaceholderView';
import SectionHeader from './SectionHeader';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

interface SongsListProps {
    songs: SongsDB;
    filter?: string;
    loading?: boolean;
    onRefresh?: () => void;
}

const SongsList: FC<SongsListProps> = ({
    songs,
    filter,
    loading,
    onRefresh
}) => {
    const listRef = useRef(null),
        componentHeights = useComponentHeights(),
        scrollToTop = () => {
            if (songs.length > 0 && !!listRef.current) {
                listRef.current.scrollToLocation({
                    sectionIndex: 0,
                    itemIndex: 0
                });
            }
        },
        getItemLayout = sectionListGetItemLayout({
            getItemHeight: () => componentHeights.songItem,
            getSeparatorHeight: () => componentHeights.separatorLine,
            /* SectionHeader unstable on fast scroll without added SeparatorLine
             * height for unknown reason */
            getSectionHeaderHeight: () =>
                componentHeights.sectionHeader + componentHeights.separatorLine
        });

    console.log('componentHeights:', componentHeights);

    useEffect(scrollToTop, [songs]);

    return songs.length > 0 ? (
        <SectionList
            ref={listRef}
            refreshControl={
                <RefreshControl
                    refreshing={!!loading}
                    colors={[colors.RED]}
                    progressBackgroundColor={colors.VERY_LIGHT_GREY}
                    progressViewOffset={componentHeights.titleBar}
                    onRefresh={onRefresh}
                />
            }
            renderItem={({ item, section }) => (
                <SongItem
                    data={item}
                    filter={filter}
                    onPress={() => {
                        Clipboard.setString(
                            `*${section.titleAbbr} ${item.number.toString()}* ${
                                item.title
                            }`
                        );
                        ToastAndroid.show(
                            'Song copied to clipboard',
                            ToastAndroid.SHORT
                        );
                    }}
                />
            )}
            renderSectionHeader={({ section: { title, data } }) => (
                <SectionHeader
                    title={title}
                    data={data}
                    showNumResults={!!filter}
                />
            )}
            sections={songs}
            keyExtractor={item => String(item.key)}
            ItemSeparatorComponent={SeparatorLine}
            ListFooterComponent={SeparatorLine}
            stickySectionHeadersEnabled={true}
            getItemLayout={getItemLayout}
            //initialNumToRender={50}
            //maxToRenderPerBatch={200}
            //windowSize={41}
            //updateCellsBatchingPeriod={20}
        />
    ) : !!filter ? (
        <PlaceholderView text="No results found" iconName="md-sad" />
    ) : null;
};

export default SongsList;
