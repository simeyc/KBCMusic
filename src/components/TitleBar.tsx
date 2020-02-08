import React, {FC} from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-ionicons';
import {colors, fontSizes} from '../constants';

interface TitleBarAction {
  name: string;
  icon: string;
  callback(): void;
}

interface TitleBarProps {
  title: string;
  actions?: TitleBarAction[];
}

const TitleBar: FC<TitleBarProps> = ({title, actions = []}) => (
  <>
    <Text style={styles.headerText}>{title}</Text>
    {actions.map(({name, icon, callback}) => (
      <TouchableNativeFeedback
        key={name}
        background={TouchableNativeFeedback.Ripple(colors.WHITE, true)}
        onPress={callback}>
        <View style={{marginLeft: 20}}>
          <Icon name={icon} size={fontSizes.LARGE} color={colors.WHITE} />
        </View>
      </TouchableNativeFeedback>
    ))}
  </>
);

const styles = StyleSheet.create({
  headerText: {
    flex: 1,
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: fontSizes.LARGE,
  },
});

export default TitleBar;
