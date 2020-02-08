import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SongData } from '../types/SongData';
import { colors, fontSizes } from '../constants';
import { matchesPattern } from '@babel/types';

interface SongItemProps {
    data: SongData;
    filter?: string;
}

const SongItem: FC<SongItemProps> = ({ data, filter }) => {
    const { number, title, altTitle } = data,
        filterRegex = !!filter
            ? new RegExp(
                  `(^|[ -])(${filter
                      .split(/[ -]/)
                      .map(word => word.split('').join('[^a-zA-Z0-9 -]*'))
                      .join('[^a-zA-Z0-9 -]*[ -][^a-zA-Z0-9 -]*')})`,
                  'gi'
              )
            : undefined,
        getTextContent = (text: string) => {
            if (!filterRegex) {
                return text;
            } else {
                const textGroups = [];
                let match,
                    endIndex = 0;
                while ((match = filterRegex.exec(text)) != null) {
                    const startIndex = match.index + match[1].length;
                    if (startIndex > endIndex) {
                        textGroups.push(text.slice(endIndex, startIndex));
                    }
                    endIndex = filterRegex.lastIndex;
                    textGroups.push(
                        <Text
                            key={`${filter}_${textGroups.length}`}
                            style={{ backgroundColor: colors.HIGHLIGHT }}>
                            {text.slice(startIndex, endIndex)}
                        </Text>
                    );
                }
                if (endIndex < text.length) {
                    textGroups.push(text.slice(endIndex));
                }
                return textGroups;
            }
        },
        titleContent = getTextContent(title);

    return (
        <View style={styles.container}>
            <Text style={styles.number}>
                {!!filter && filter === number.toString() ? (
                    <Text style={{ backgroundColor: colors.HIGHLIGHT }}>
                        {number}
                    </Text>
                ) : (
                    number
                )}
            </Text>
            {altTitle ? (
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={styles.title}>
                        {titleContent}
                    </Text>
                    <Text numberOfLines={1} style={styles.altTitle}>
                        {getTextContent(altTitle)}
                    </Text>
                </View>
            ) : (
                <Text numberOfLines={2} style={styles.title}>
                    {!!filter ? titleContent : title}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 54
    },
    number: {
        flex: 0,
        color: colors.GREY,
        fontSize: fontSizes.MEDIUM,
        minWidth: 50,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        flex: 1,
        color: colors.BLACK,
        fontSize: fontSizes.MEDIUM,
        textAlignVertical: 'center'
    },
    altTitle: {
        flex: 1,
        color: colors.GREY,
        fontSize: fontSizes.SMALL,
        fontStyle: 'italic'
    }
});

export default SongItem;
