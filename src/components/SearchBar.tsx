import React, { FC, useState } from 'react';
import { View, TouchableNativeFeedback, TextInput } from 'react-native';
import Icon from 'react-native-ionicons';
import { colors, fontSizes } from '../constants';
import { useDebouncedCallback } from 'use-debounce';
import HeaderBar from './HeaderBar';

interface SearchBarProps {
    onUpdateText: (text: string) => void;
    onClose: () => void;
    inputRef: React.MutableRefObject<null>;
}

const SearchBar: FC<SearchBarProps> = ({ onUpdateText, onClose, inputRef }) => {
    const [text, setText] = useState<string>(''),
        [debouncedCallback] = useDebouncedCallback(onUpdateText, 250),
        onChangeText = (text: string) => {
            setText(text);
            debouncedCallback(text);
        },
        onClearText = () => {
            setText('');
            onUpdateText('');
            if (!!inputRef.current) {
                inputRef.current.focus();
            }
        };
    return (
        <HeaderBar>
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(colors.WHITE, true)}
                onPress={onClose}>
                <View style={{ margin: 10 }}>
                    <Icon
                        name="md-arrow-round-back"
                        size={fontSizes.LARGE}
                        color={colors.WHITE}
                    />
                </View>
            </TouchableNativeFeedback>
            <TextInput
                ref={inputRef}
                value={text}
                onChangeText={onChangeText}
                style={{
                    flex: 1,
                    color: colors.WHITE,
                    fontSize: fontSizes.MEDIUM,
                    paddingTop: 0,
                    paddingBottom: 0
                }}
                placeholder="Search all songs..."
                placeholderTextColor={colors.LIGHT_GREY}
                autoCapitalize={'none'}
            />
            {!!text && (
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(
                        colors.WHITE,
                        true
                    )}
                    onPress={onClearText}>
                    <View style={{ margin: 10 }}>
                        <Icon
                            name="md-close"
                            size={fontSizes.MEDIUM_LARGE}
                            color={colors.WHITE}
                        />
                    </View>
                </TouchableNativeFeedback>
            )}
        </HeaderBar>
    );
};

export default SearchBar;
