import React, { FC, useState, useCallback } from 'react';
import {
    StyleSheet,
    View,
    TouchableNativeFeedback,
    TextInput
} from 'react-native';
import Icon from 'react-native-ionicons';
import { colors, fontSizes } from '../constants';
import debounce from 'lodash.debounce';

// search bar that slides out under HeaderBar and stays visible while in use,
// with "X" button to close
// OR
// search bar that slides in from the right, with right caret 'back' button on
// the left to return to normal header bar (simlar to Google Play Music)

interface SearchBarProps {
    onChangeFilter: (filter: string) => void;
    onClose: () => void;
}

const SearchBar: FC<SearchBarProps> = ({ onChangeFilter, onClose }) => {
    const [text, setText] = useState<string>(''),
        debouncedOnChangeFilter = useCallback(
            debounce(
                text =>
                    onChangeFilter(text.trim().replace(/[^a-zA-Z0-9 -]/g, '')),
                250
            ),
            []
        ),
        onChangeText = (text: string) => {
            setText(text);
            debouncedOnChangeFilter(text);
        };
    return (
        <>
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
                value={text}
                onChangeText={onChangeText}
                style={styles.textInput}
                autoFocus={true}
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
                    onPress={() => onChangeText('')}>
                    <View style={{ margin: 10 }}>
                        <Icon
                            name="md-close"
                            size={fontSizes.MEDIUM_LARGE}
                            color={colors.WHITE}
                        />
                    </View>
                </TouchableNativeFeedback>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        color: colors.WHITE,
        fontSize: fontSizes.MEDIUM,
        paddingTop: 0,
        paddingBottom: 0
    }
});

export default SearchBar;
