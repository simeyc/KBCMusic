import React, { FC } from 'react';
import { View, StatusBar } from 'react-native';
import { colors } from '../constants';

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
                minHeight: 52,
                maxHeight: 52
            }}>
            {children}
        </View>
    </>
);

export default HeaderBar;
