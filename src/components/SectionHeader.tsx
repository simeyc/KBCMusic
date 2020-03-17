import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { colors, fontSizes } from '../constants';

interface SectionHeaderProps {
    title: String;
    data: any[];
    showNumResults?: boolean;
}

const SectionHeader: FC<SectionHeaderProps> = ({
    title,
    data,
    showNumResults
}) => (
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
            {!showNumResults
                ? title
                : `${title} (${data.length.toString()} result` +
                  (data.length === 1 ? ')' : 's)')}
        </Text>
    </View>
);

export default SectionHeader;
