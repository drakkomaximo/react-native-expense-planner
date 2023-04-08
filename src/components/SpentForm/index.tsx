/* eslint-disable prettier/prettier */
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import {styles} from './styles';
import {Picker} from '@react-native-picker/picker';
import {optionsPicker} from './constants';
import {CategoryOptions, Spent} from '../../../App';
import {formatDate, generateId} from '../../helpers';

export type SpentFormProps = {
  toggleModal: () => void;
  updateSpents: ({spent, isUpdate}: {spent: Spent; isUpdate: boolean}) => void;
  handleExpense: ({spent}: {spent: Spent | undefined}) => void;
  hanldeDeleteSpent: ({id}: {id: string}) => void;
  expense?: Spent;
};

const SpentForm: FC<SpentFormProps> = ({
  toggleModal,
  updateSpents,
  handleExpense,
  hanldeDeleteSpent,
  expense,
}) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryOptions>('');
  const [id, setId] = useState('');
  const [date, setDate] = useState('');

  const handleCancel = () => {
    toggleModal();
    handleExpense({spent: undefined});
  };

  const setFromValues = useCallback(() => {
    if (expense) {
      setName(expense.name);
      setAmount(expense.amount.toString());
      setCategory(expense.category);
      setId(expense.id);
      setDate(expense.date);
    }
  }, [expense]);

  useEffect(() => {
    setFromValues();
  }, [setFromValues]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Pressable style={styles.cancelBtn} onLongPress={handleCancel}>
          <Text style={styles.cancelBtnText}>Back</Text>
        </Pressable>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>{expense ? 'Edit' : 'New'} Spent</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Name of spent</Text>
          <TextInput
            style={styles.input}
            placeholder="Name of spent"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Amount of spent</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount of spent"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Category of spent</Text>
          <Picker
            style={styles.input}
            selectedValue={category}
            onValueChange={setCategory}>
            {optionsPicker.map(option => (
              <Picker.Item
                key={option.id}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.btnActionsContainer}>
          <Pressable
            style={[styles.btn, styles.right, styles.submitBtn]}
            onPress={() =>
              updateSpents({
                spent: {
                  name,
                  category,
                  amount: Number(amount),
                  id: id !== '' ? id : generateId(),
                  date: date !== '' ? date : formatDate({date: Date.now()}),
                },
                isUpdate: !!expense,
              })
            }>
            <Text style={[styles.btnText]}>
              {expense ? 'Edit' : 'Add'} spent
            </Text>
          </Pressable>
          {expense && (
            <Pressable
              style={[styles.btn, styles.left, styles.deleteBtn]}
              onLongPress={() => hanldeDeleteSpent({id})}>
              <Text style={[styles.btnText]}>Delete Spent</Text>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SpentForm;
