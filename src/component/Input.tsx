import React, { FC, useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import COLOR from '../../assets/color';

export interface InputPros extends TextInputProps {
  formLabel?: string;
  underLineColorFocus: string;
  underLineColorBlur?: string;
}

const Input: FC<InputPros> = ({
  formLabel,
  underLineColorBlur = COLOR.underLineGrey,
  underLineColorFocus,
  value,
  onChange,
  onBlur,
  style,
  ...props
}): JSX.Element => {
  const [isFocused, setFocused] = useState<boolean>(false);

  const handleBlur = (e: any) => {
    setFocused(false);
    onBlur && onBlur(e);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const borderBottomColor: string = useMemo(
    () => (isFocused ? underLineColorFocus : underLineColorBlur),
    [isFocused]
  );

  return (
    <View style={styles.container}>
      {!!formLabel && <Text style={styles.formLabel}>{formLabel}</Text>}
      <TextInput
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        style={[styles.input, { borderBottomColor }, style]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    color: COLOR.white
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15
  },
  formLabel: {
    color: COLOR.offWhite,
    // marginRight: 0,
    width: '20%'
  }
});

export default Input;
