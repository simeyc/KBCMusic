import React, { FC } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../constants';

interface LoadingSpinnerProps {
    style?: Record<string, any>;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ style }) => (
    <View
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            ...style
        }}>
        <ActivityIndicator size="large" color={colors.RED} />
    </View>
);

export default LoadingSpinner;
