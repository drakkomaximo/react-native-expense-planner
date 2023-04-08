/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import globalStyles from '../../styles';

export const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    transform: [{translateY: 0}],
    marginTop: 70,
  },
  label: {
    textAlign: 'center',
    fontSize: 22,
    color: '#64748B',
    fontWeight: '900',
  },
  input: {
    ...globalStyles.input,
  },
});
