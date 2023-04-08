/* eslint-disable prettier/prettier */
import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { Picker } from '@react-native-picker/picker';
import { optionsPicker } from '../SpentForm/constants';
import { CategoryOptions } from '../../../App';

export type SpentFilterProps = {
  filterValue: CategoryOptions;
  handleFilterValue: ({category}:{category: CategoryOptions}) => void;
}

const SpentFilter: FC<SpentFilterProps> = ({filterValue, handleFilterValue}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>Filter expenses</Text>
        <Picker
            style={styles.input}
            selectedValue={filterValue}
            onValueChange={(category)=> handleFilterValue({category})}>
            {optionsPicker.map(option => (
              <Picker.Item
                key={option.id}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
    </View>
  );
};

export default SpentFilter;
