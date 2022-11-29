import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLOR from '../../assets/color';

export interface FloatingButtonProps extends TouchableOpacityProps {}

const FloatingButton: FC<FloatingButtonProps> = (props): JSX.Element => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Ionicons name={'add'} size={26} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: COLOR.red,
    right: 40,
    bottom: 40,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    fontWeight: 'bold',
    color: COLOR.white
  }
});

export default FloatingButton;
