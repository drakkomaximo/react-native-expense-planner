/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import globalStyles from '../../styles';

export const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    color: '#000',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  category: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  name: {
    fontSize: 22,
    color: '#64748B',
    marginBottom: 5,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
  },
  date:{
    fontWeight: '700',
    color: '#DB2777',
  },
});
