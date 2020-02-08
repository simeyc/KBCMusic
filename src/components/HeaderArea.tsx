import React, {FC} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {colors} from '../constants';

const HeaderArea: FC = ({children}) => (
  <>
    <StatusBar backgroundColor={colors.DARK_RED} />
    <View style={styles.headerArea}>{children}</View>
  </>
);

const styles = StyleSheet.create({
  headerArea: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.RED,
    alignItems: 'center',
    padding: 10,
    minHeight: 52,
    maxHeight: 52
  }
});

export default HeaderArea;
