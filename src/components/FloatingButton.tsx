import React, { FC } from 'react';
import { TouchableOpacity, View, ToastAndroid } from 'react-native';
import Icon from 'react-native-ionicons';
import { colors, fontSizes } from '../constants';

interface FloatingButtonProps {
    onClick: () => void;
}

const FloatingButton: FC<FloatingButtonProps> = ({ onClick }) => (
    <TouchableOpacity
        style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 30,
            right: 30,
            height: 60,
            width: 60,
            backgroundColor: colors.WHITE,
            borderRadius: 100
        }}
        onPress={onClick}>
        <Icon
            name="ios-arrow-dropup-circle"
            size={fontSizes.HUGE}
            color={colors.RED}
        />
    </TouchableOpacity>
);

export default FloatingButton;
