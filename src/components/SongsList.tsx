import React, { FC, useRef, useEffect } from 'react';
import {
    View,
    SectionList,
    TouchableNativeFeedback,
    Text,
    Clipboard,
    ToastAndroid,
    RefreshControl
} from 'react-native';
import Icon from 'react-native-ionicons';
import SongItem from './SongItem';
import { colors, fontSizes, HEADERBAR_HEIGHT } from '../constants';
import { SongsDB } from '../types';
import SeparatorLine from './SeparatorLine';
import PlaceholderView from './PlaceholderView';

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
        scrollToTop = () => {
            if (songs.length > 0 && !!listRef.current) {
                listRef.current.scrollToLocation({
                    sectionIndex: 0,
                    itemIndex: 0
                });
            }
        };

    useEffect(scrollToTop, [songs]);

    return songs.length > 0 ? (
        <SectionList
            ref={listRef}
            refreshControl={
                <RefreshControl
                    refreshing={!!loading}
                    colors={[colors.RED]}
                    progressBackgroundColor={colors.VERY_LIGHT_GREY}
                    progressViewOffset={HEADERBAR_HEIGHT}
                    onRefresh={onRefresh}
                />
            }
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
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: colors.LIGHT_GREY,
                        alignItems: 'center'
                    }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: fontSizes.MEDIUM,
                            color: colors.GREY,
                            padding: 5,
                            paddingLeft: 10,
                            flex: 1
                        }}>
                        {!filter
                            ? title
                            : `${title} (${data.length.toString()} result` +
                              (data.length === 1 ? ')' : 's)')}
                    </Text>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple(
                            colors.WHITE,
                            true
                        )}
                        onPress={scrollToTop}>
                        <View style={{ marginRight: 10 }}>
                            <Icon
                                name="md-arrow-dropup"
                                size={fontSizes.LARGE}
                                color={colors.GREY}
                            />
                        </View>
                    </TouchableNativeFeedback>
                </View>
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
