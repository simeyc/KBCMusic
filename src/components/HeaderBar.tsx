import React, { FC } from 'react';
import { View, StatusBar } from 'react-native';
import { colors, HEADERBAR_HEIGHT } from '../constants';

const HeaderBar: FC = ({ children }) => (
    <>
        <StatusBar backgroundColor={colors.DARK_RED} />
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: colors.RED,
                alignItems: 'center',
                padding: 10,
                minHeight: HEADERBAR_HEIGHT,
                maxHeight: HEADERBAR_HEIGHT
            }}>
            {children}
        </View>
    </>
);

export default HeaderBar;
