import React, { FC, ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface ButtonWrapperProps extends TouchableOpacityProps {
  children?: ReactNode;
}

const ButtonWrapper: FC<ButtonWrapperProps> = ({ children, ...props }): JSX.Element => (
  <TouchableOpacity {...props}>{children}</TouchableOpacity>
);

export default ButtonWrapper;
