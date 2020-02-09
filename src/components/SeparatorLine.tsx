import React, { FC } from 'react';
import { View } from 'react-native';
import { colors } from '../constants';

const SeparatorLine: FC = () => (
    <View
        style={{
            height: 1,
            backgroundColor: colors.LIGHT_GREY
        }}
    />
);

export default SeparatorLine;
