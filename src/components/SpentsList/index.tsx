/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {Spent} from '../../../App';
import Expense from '../Expense';

export type SpentsListProps = {
  spents: Spent[];
  toggleModal: () => void;
  handleExpense: ({spent}: {spent: Spent}) => void
};

const SpentsList: FC<SpentsListProps> = ({spents, toggleModal,handleExpense}) => {
  return (
    <View style={styles.container}>
      <Text style={[spents.length === 0 && styles.noSpentsTitle, styles.title]}>Spents</Text>

      {spents.length === 0 ? (
        <Text style={styles.noSpents}>There aren't spents</Text>
      ) : (
        spents.map(spent => <Expense key={spent.id} spent={spent} toggleModal={toggleModal} handleExpense={handleExpense} />)
      )}
    </View>
  );
};

export default SpentsList;
