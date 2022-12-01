import { Formik, FormikProps } from 'formik';
import moment from 'moment';
import React, { FC, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLOR from '../../assets/color';
import { AddIncomeFormValues } from '../types/transaction';
import { TransactionType } from '../utils/transaction';
import Input from './Input';

export interface AddIncomeProps {}

const AddIncome: FC<AddIncomeProps> = (): JSX.Element => {
  const initialValues: AddIncomeFormValues = useMemo(
    () => ({
      date: moment().format('dd-mm-yyyy'),
      account: '',
      amount: 0,
      category: '',
      description: '',
      note: '',
      type: TransactionType.Income
    }),
    []
  );

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(a: any) => {
          console.log('debug: onsubmit: ', a);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }: FormikProps<AddIncomeFormValues>) => (
          <>
            <View style={styles.formTopHalf}>
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

            <View style={styles.divider} />

            <View style={styles.formBottomHalf}>
              <Input
                // formLabel={'Description'}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                placeholder={'Description'}
                placeholderTextColor={COLOR.grey}
                underLineColorFocus={COLOR.blue}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
  divider: {
    height: 8,
    backgroundColor: COLOR.blackDiv,
    marginTop: 25,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: COLOR.underLineGrey
  },
  formTopHalf: {
    height: 300,
    paddingTop: 20
  },
  formBottomHalf: {
    height: 350
  }
});

export default AddIncome;
