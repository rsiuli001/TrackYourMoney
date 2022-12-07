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
import { AddTransactionFormValues, Transaction } from '../types/transaction';
import { TransactionType } from '../utils/transaction';
import BottomSheet from './BottomSheet';
import Button from './Button';
import Input from './Input';

export interface AddTransactionFormProps {
  transactionType: TransactionType;
}

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
          <Input
            // editable={false}
            formLabel={'Date'}
            onChangeText={handleChange('date')}
            onBlur={handleBlur('date')}
            value={values.date}
            underLineColorFocus={COLOR.blue}
            returnKeyType={'next'}
          />

          <Input
            formLabel={'Account'}
            onChangeText={handleChange('account')}
            onBlur={handleBlur('account')}
            value={values.account}
            underLineColorFocus={COLOR.blue}
          />

          <Input
            formLabel={'Category'}
            onChangeText={handleChange('category')}
            onBlur={handleBlur('category')}
            value={values.category}
            underLineColorFocus={COLOR.blue}
          />

          <Input
            ref={amountRef}
            formLabel={'Amount'}
            onChangeText={handleChange('amount')}
            onBlur={handleBlur('amount')}
            value={values.amount.toString()}
            underLineColorFocus={COLOR.blue}
            keyboardType={'numeric'}
            onFocus={() => {
              console.log('debug: field 4 on focus');
            }}
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
