import React, { FC, useRef, useEffect } from 'react';
import {
    View,
    SectionList,
    TouchableNativeFeedback,
    Text,
    Clipboard,
    ToastAndroid
} from 'react-native';
import SongItem from './SongItem';
import { colors, fontSizes } from '../constants';
import { SongsDB } from '../types';
import SeparatorLine from './SeparatorLine';
import PlaceholderView from './PlaceholderView';

interface SongsListProps {
    songs: SongsDB;
    filter?: string;
}

const SongsList: FC<SongsListProps> = ({ songs, filter }) => {
    const listRef = useRef(null);

    useEffect(() => {
        if (songs.length > 0 && !!listRef.current) {
            listRef.current.scrollToLocation({
                sectionIndex: 0,
                itemIndex: 0
            });
        }
    }, [songs]);

    return songs.length > 0 ? (
        <SectionList
            ref={listRef}
            //refreshing={songsController.loading}
            renderItem={({ item, section }) => (
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(
                        colors.LIGHT_GREY
                    )}
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
            sections={songs}
            keyExtractor={item => String(item.key)}
            ItemSeparatorComponent={SeparatorLine}
            {...(songs.length > 0 && {
                ListFooterComponent: SeparatorLine
            })}
            stickySectionHeadersEnabled={true}
        />
    ) : !!filter ? (
        <PlaceholderView text="No results found" iconName="md-sad" />
    ) : null;
};

export default SongsList;
