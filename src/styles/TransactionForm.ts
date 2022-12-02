import { StyleSheet } from 'react-native';
import COLOR from '../../assets/color';

export const TransactionFormStyles = StyleSheet.create({
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
    height: 280,
    paddingTop: 20
  },
  formBottomHalf: {
    height: 320
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 10
  },
  saveButton: {
    width: '60%',
    backgroundColor: COLOR.blue
  },
  continueButton: {
    borderWidth: 1,
    borderColor: COLOR.grey,
    flex: 1
  }
});
