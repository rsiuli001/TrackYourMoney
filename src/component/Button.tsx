import React, { FC } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import COLOR from '../../assets/color';

export interface ButtonProps extends TouchableOpacityProps {
  label: string;
  labelStyle?: TextStyle;
}

const Button: FC<ButtonProps> = ({ style, label, labelStyle, ...props }): JSX.Element => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  label: {
    color: COLOR.white
  }
});

export default Button;
