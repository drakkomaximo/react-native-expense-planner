/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import globalStyles from '../../styles';

export const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  imageCenter: {
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  textContainer: {
    marginTop: 50,
  },
  value: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
    color: '#3B82F6',
  },
  btnReset:{
    backgroundColor: '#DB2777',
    padding: 10,
    marginTop: 40,
    borderRadius: 5,
  },
  btnResetText:{
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
