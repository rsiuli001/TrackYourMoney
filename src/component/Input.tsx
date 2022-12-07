import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useMemo,
  useState
} from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import COLOR from '../../assets/color';

export interface InputProps extends TextInputProps {
  formLabel?: string;
  underLineColorFocus: string;
  underLineColorBlur?: string;
}

const Input: ForwardRefExoticComponent<InputProps & RefAttributes<TextInput>> = forwardRef(
  (
    {
      formLabel,
      underLineColorBlur = COLOR.underLineGrey,
      underLineColorFocus,
      value,
      onChange,
      onBlur,
      style,
      ...props
    }: InputProps,
    ref?: React.LegacyRef<TextInput>
  ): JSX.Element => {
    const [isFocused, setFocused] = useState<boolean>(false);

    const handleBlur = (e: any): void => {
      setFocused(false);
      onBlur && onBlur(e);
    };

    const handleFocus = (): void => {
      setFocused(true);
    };

    const borderBottomColor: string = useMemo(
      (): string => (isFocused ? underLineColorFocus : underLineColorBlur),
      [isFocused]
    );

    return (
      <View style={styles.container}>
        {!!formLabel && <Text style={styles.formLabel}>{formLabel}</Text>}
        <TextInput
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          style={[styles.input, { borderBottomColor }, style]}
          {...props}
        />
      </View>
    );
  }
);

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
    marginTop: 10
  },
  formLabel: {
    color: COLOR.offWhite,
    // marginRight: 0,
    width: '20%'
  }
});

export default Input;
