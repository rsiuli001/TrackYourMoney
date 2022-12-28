import { useNavigation } from '@react-navigation/native';
import { FormikHelpers, useFormik } from 'formik';
import moment from 'moment';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import COLOR from '../../assets/color';
import { addExpense } from '../redux/expenseSlice';
import { addIncome } from '../redux/incomeSlice';
import { TransactionFormStyles } from '../styles/TransactionForm';
import { AddTransactionFormValues, PickerDataType, Transaction } from '../types/transaction';
import { PickerType, TransactionType } from '../utils/transaction';
import BottomSheet from './BottomSheet';
import Button from './Button';
import DatePickerModal from './DatePickerModal';
import Input from './Input';
import Picker from './Picker';

export interface AddTransactionFormProps {
  transactionType: TransactionType;
}

const accountData: PickerDataType[] = [
  {
    id: '1',
    label: 'Cash',
    type: PickerType.Account
  },
  {
    id: '2',
    label: 'Bank Accounts',
    type: PickerType.Account
  },
  {
    id: '5',
    label: 'Salary Accounts',
    type: PickerType.Account
  },
  {
    id: '4',
    label: 'Credit Cards',
    type: PickerType.Account
  }
];

const AddTransactionForm: FC<AddTransactionFormProps> = ({ transactionType }): JSX.Element => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const amountRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const dispatch = useDispatch();
  const nav = useNavigation();

  const initialValues: AddTransactionFormValues = useMemo(
    () => ({
      date: moment().format('DD-MM-YYYY'),
      account: '',
      amount: 0,
      category: '',
      description: '',
      note: '',
      type: transactionType
    }),
    [transactionType]
  );

  const onSubmit = (
    values: AddTransactionFormValues,
    formikHelpers: FormikHelpers<AddTransactionFormValues>
  ): void => {
    const transaction: Transaction = {
      ...values,
      id: moment().valueOf().toString()
    };

    if (transactionType === TransactionType.Expense) {
      dispatch(
        addExpense({
          key: transaction.date,
          value: transaction
        })
      );
    } else {
      dispatch(
        addIncome({
          key: transaction.date,
          value: transaction
        })
      );
    }

    formikHelpers.resetForm();
    nav.goBack();
  };

  const { handleBlur, handleChange, handleSubmit, values } = useFormik<AddTransactionFormValues>({
    initialValues,
    enableReinitialize: true,
    onSubmit
  });

  return (
    <View style={TransactionFormStyles.container}>
      <>
        <View style={TransactionFormStyles.formTopHalf}>
          <DatePickerModal
            value={values.date}
            onChange={(dateString: string) => {
              handleChange({ target: { name: 'date', value: dateString } });
            }}
          />

          <Picker
            label={'Account'}
            data={accountData}
            value={values.account}
            onChange={(d: PickerDataType) => {
              handleChange({ target: { name: 'account', value: d.label } });
            }}
          />

          <Picker
            label={'Category'}
            data={accountData}
            value={values.category}
            onChange={(d: PickerDataType) => {
              handleChange({ target: { name: 'category', value: d.label } });
            }}
          />

          <Input
            ref={amountRef}
            formLabel={'Amount'}
            onChangeText={handleChange('amount')}
            onBlur={handleBlur('amount')}
            value={values.amount.toString()}
            underLineColorFocus={COLOR.blue}
            keyboardType={'numeric'}
          />

          <Input
            ref={noteRef}
            formLabel={'Note'}
            onChangeText={handleChange('note')}
            onBlur={handleBlur('note')}
            value={values.note}
            underLineColorFocus={COLOR.blue}
          />
        </View>

        <View style={TransactionFormStyles.divider} />

        <View style={TransactionFormStyles.formBottomHalf}>
          <Input
            ref={descriptionRef}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            placeholder={'Description'}
            placeholderTextColor={COLOR.grey}
            underLineColorFocus={COLOR.blue}
          />

          <View style={TransactionFormStyles.buttonContainer}>
            <Button
              label={'Save'}
              style={TransactionFormStyles.saveButton}
              onPress={handleSubmit}
            />
            <Button label={'Continue'} style={TransactionFormStyles.continueButton} />
          </View>
        </View>
      </>

      <BottomSheet
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        {/* {renderModalContent()} */}
      </BottomSheet>
    </View>
  );
};

export default AddTransactionForm;
