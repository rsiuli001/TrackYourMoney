import { PickerDataType } from '@/types/transaction';
import COLOR from '@assets/color';
import React, { FC, ReactNode, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import BottomSheet from './BottomSheet';

export interface PickerProps {
  data: any[];
  value: string;
  onChange: (data: PickerDataType) => void;
  label: string;
}

const Picker: FC<PickerProps> = ({ data, value, onChange, label }): JSX.Element => {
  const [isVisible, setVisible] = useState<boolean>(false);

  const onModalOpen = (): void => {
    setVisible(true);
  };

  const onModalClose = (): void => {
    setVisible(false);
  };

  const onPress = (item: PickerDataType) => {
    onModalClose();
    onChange(item);
  };

  const borderBottomColor: string = useMemo(
    (): string => (isVisible ? COLOR.blue : COLOR.underLineGrey),
    [isVisible]
  );

  const renderData = (item: PickerDataType): ReactNode => {
    return (
      <Pressable key={item.id} style={styles.pickerData} onPress={() => onPress(item)}>
        <Text style={styles.pickerDataText}>{item.label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={[styles.input, { borderBottomColor }]} onPress={onModalOpen}>
        <Text style={styles.value}>{value}</Text>
      </Pressable>

      <BottomSheet visible={isVisible} onRequestClose={onModalClose}>
        <ScrollView>
          <View style={styles.pickerDataContainer}>{data.map(item => renderData(item))}</View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    color: COLOR.white,
    justifyContent: 'center'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10
  },
  label: {
    color: COLOR.offWhite,
    width: '20%'
  },
  value: {
    color: COLOR.white
  },
  pickerDataContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: COLOR.blackDiv,
    height: 270
  },
  pickerData: {
    width: '33.333333%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: COLOR.underLineGrey
  },
  pickerDataText: {
    color: COLOR.white,
    fontSize: 13,
    fontWeight: '300'
  }
});

export default Picker;
