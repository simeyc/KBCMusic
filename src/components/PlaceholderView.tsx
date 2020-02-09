import React, { FC } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-ionicons';
import { colors, fontSizes } from '../constants';

interface PlaceholderViewProps {
    text: string;
    iconName: string;
}

const PlaceholderView: FC<PlaceholderViewProps> = ({ text, iconName }) => (
    <View
        style={{
            alignItems: 'center',
            paddingTop: 20
        }}>
        <Icon name={iconName} size={fontSizes.HUGE} color={colors.GREY} />
        <Text
            style={{
                color: colors.GREY,
                fontSize: fontSizes.MEDIUM_LARGE,
                fontWeight: 'bold'
            }}>
            {text}
        </Text>
    </View>
);

export default PlaceholderView;
