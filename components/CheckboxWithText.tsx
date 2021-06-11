import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import {StyleSheet, Text, View} from 'react-native';

interface CheckboxWithTextProps {
  title: string;
  value: boolean;
  setFunction: Function;
}

const CheckboxWithText = ({
  title,
  value,
  setFunction,
}: CheckboxWithTextProps) => {
  return (
    <View style={styles.container}>
      <CheckBox
        value={value}
        onValueChange={newValue => setFunction(newValue)}
      />
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CheckboxWithText;
