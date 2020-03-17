import React, { FC } from 'react';
import { View, PixelRatio } from 'react-native';
import { colors } from '../constants';

const SeparatorLine: FC = () => (
    <View
        style={{
            height: 3 / PixelRatio.get(),
            backgroundColor: colors.LIGHT_GREY
        }}
    />
);

export default SeparatorLine;
