import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import {StyleSheet, Text, View} from 'react-native';

interface CheckboxWithTextProps extends InnerCheckboxProps {
  title: string;
}

interface InnerCheckboxProps {
  value: boolean;
  setFunction?: Function;
  isDisabled?: boolean;
}

const InnerCheckbox = ({
  value,
  setFunction,
  isDisabled,
}: InnerCheckboxProps) => {
  if (setFunction) {
    return (
      <CheckBox
        value={value}
        onValueChange={newValue => setFunction(newValue)}
        disabled={isDisabled}
      />
    );
  } else {
    return <CheckBox value={value} disabled={isDisabled} />;
  }
};

const CheckboxWithText = ({
  title,
  value,
  setFunction,
  isDisabled,
}: CheckboxWithTextProps) => {
  return (
    <View style={styles.container}>
      <InnerCheckbox
        value={value}
        setFunction={setFunction}
        isDisabled={isDisabled}
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
