/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {styles} from './styles';

export type NewBudgetProps = {
  handleNewBudget: () => void;
  budget: number;
  handleBudgetValue: ({value}: {value: string}) => void;
};

const NewBudget: FC<NewBudgetProps> = ({
  handleNewBudget,
  budget,
  handleBudgetValue,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Define budget</Text>

      <TextInput
        keyboardType="numeric"
        placeholder="Add expense"
        style={styles.input}
        value={budget.toString()}
        onChangeText={value => handleBudgetValue({value})}
      />

      <Pressable style={styles.btn} onPress={handleNewBudget}>
        <Text style={styles.btnText}>Add bugget</Text>
      </Pressable>
    </View>
  );
};

export default NewBudget;
