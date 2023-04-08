/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {styles} from './styles';
import {Spent} from '../../../App';
import {formatAmount} from '../../helpers';
import {iconDiccionary} from './constants';

export type ExpenseProps = {
  spent: Spent;
  toggleModal: () => void;
  handleExpense: ({spent}: {spent: Spent}) => void;
};

const Expense: FC<ExpenseProps> = ({spent, toggleModal, handleExpense}) => {
  const {amount, category, name, date} = spent;

  const handleAction = () => {
    toggleModal();
    handleExpense({spent});
  };

  return (
    <Pressable onLongPress={handleAction}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={iconDiccionary[category]} />
            <View style={styles.textContainer}>
              <Text style={styles.category}>{category}</Text>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
          </View>
          <Text style={styles.amount}>{formatAmount({amount})}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Expense;
