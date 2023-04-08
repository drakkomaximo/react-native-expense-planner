/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import globalStyles from '../../styles';

export const styles = StyleSheet.create({
  btnActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: '#1E40AF',
    flex: 1,
  },
  form: {
    ...globalStyles.container,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 30,
    color: '#64748B',
  },
  field: {
    marginVertical: 10,
  },
  label: {
    color: '#64748B',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    ...globalStyles.input,
  },
  btn: {
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    flex: 1,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  right: {
    marginRight: 10,
  },
  left: {
    marginLeft: 10,
  },
  deleteBtn: {
    backgroundColor: 'red',
  },
  submitBtn: {
    backgroundColor: '#3B82f6',
  },
  cancelBtn: {
    backgroundColor: '#DB2777',
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  cancelBtnText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
