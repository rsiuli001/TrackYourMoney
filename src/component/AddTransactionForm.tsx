import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import moment from 'moment';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import COLOR from '../../assets/color';
import { addExpense } from '../redux/expenseSlice';
import { addIncome } from '../redux/incomeSlice';
import { TransactionFormStyles } from '../styles/TransactionForm';
import { AddTransactionFormValues, Transaction } from '../types/transaction';
import { TransactionType } from '../utils/transaction';
import Button from './Button';
import Input from './Input';

export interface AddTransactionFormProps {
  transactionType: TransactionType;
}

const AddTransactionForm: FC<AddTransactionFormProps> = ({ transactionType }): JSX.Element => {
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

  return (
    <View style={TransactionFormStyles.container}>
      <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={onSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values
        }: FormikProps<AddTransactionFormValues>) => (
          <>
            <View style={TransactionFormStyles.formTopHalf}>
              <Input
                formLabel={'Date'}
                onChangeText={handleChange('date')}
                onBlur={handleBlur('date')}
                value={values.date}
                underLineColorFocus={COLOR.blue}
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
                formLabel={'Amount'}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                value={values.amount.toString()}
                underLineColorFocus={COLOR.blue}
                keyboardType={'numeric'}
              />

              <Input
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
        )}
      </Formik>
    </View>
  );
};

export default AddTransactionForm;
