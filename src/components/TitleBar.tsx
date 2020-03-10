import React, { FC } from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import Icon from 'react-native-ionicons';
import { colors, fontSizes } from '../constants';
import HeaderBar from './HeaderBar';

interface TitleBarAction {
    name: string;
    icon: string;
    onClick?: () => void;
}

interface TitleBarProps {
    title: string;
    actions?: TitleBarAction[];
}

const TitleBar: FC<TitleBarProps> = ({ title, actions = [] }) => (
    <HeaderBar>
        <Text
            style={{
                flex: 1,
                color: colors.WHITE,
                fontWeight: 'bold',
                fontSize: fontSizes.LARGE
            }}>
            {title}
        </Text>
        {actions.map(({ name, icon, onClick }) => (
            <TouchableNativeFeedback
                key={name}
                background={TouchableNativeFeedback.Ripple(colors.WHITE, true)}
                onPress={onClick}>
                <View style={{ marginLeft: 20 }}>
                    <Icon
                        name={icon}
                        size={fontSizes.LARGE}
                        color={colors.WHITE}
                    />
                </View>
            </TouchableNativeFeedback>
        ))}
    </HeaderBar>
);

export default TitleBar;
