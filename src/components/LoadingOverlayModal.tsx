import React, { FC } from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import { colors } from '../constants';

const LoadingOverlayModal: FC = () => (
    <Modal animationType="fade" visible transparent>
        <View
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.MODAL_OVERLAY
            }}>
            <ActivityIndicator size="large" color={colors.LIGHT_GREY} />
        </View>
    </Modal>
);

export default LoadingOverlayModal;
