import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import MainHeader from './src/components/MainHeader';
import NewBudget from './src/components/NewBudget';
import BudgetControl from './src/components/BudgetControl';
import SpentForm from './src/components/SpentForm';
import SpentsList from './src/components/SpentsList';
import SpentFilter from './src/components/SpentFilter';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CategoryOptions =
  | 'saving'
  | 'food'
  | 'house'
  | 'otherSpents'
  | 'leisure'
  | 'health'
  | 'subscription'
  | '';

export type Spent = {
  id: string;
  name: string;
  amount: number;
  category: CategoryOptions;
  date: string;
};

const App = (): JSX.Element => {
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [budget, setBudget] = useState(0);
  const [spents, setSpents] = useState<Spent[]>([]);
  const [expense, setExpense] = useState<Spent>();
  const [modal, setModal] = useState(false);
  const [filterValue, setFilterValue] = useState<CategoryOptions>('');
  const [spentsFiltered, setSpentsFiltered] = useState<Spent[]>([]);

  const handleNewBudget = () => {
    if (typeof budget !== 'number' || isNaN(budget) || budget <= 0) {
      Alert.alert('This value is invalid', 'Pleace assign a correct value', [
        {text: 'Ok'},
      ]);
      setIsValidBudget(false);
    } else {
      setIsValidBudget(true);
    }
  };
  const handleBudgetValue = ({value}: {value: string}) => {
    Number(value) && setBudget(Number(value));
  };

  const handleExpense = ({spent}: {spent: Spent | undefined}) => {
    setExpense(spent);
  };

  const deleteSpent = ({id}: {id: string}) => {
    const newSpents = spents.filter(oldSpent => oldSpent.id !== id);
    setSpents(newSpents);
    Alert.alert('The spent has been deleted', '', [{text: 'Ok'}]);
    toggleModal();
  };

  const hanldeDeleteSpent = ({id}: {id: string}) => {
    Alert.alert(
      '¿Do yo want to delete this spent?',
      'This action is permanent',
      [
        {text: 'back'},
        {
          text: 'Accept',
          onPress: () => deleteSpent({id}),
        },
      ],
    );
  };

  const handleFilterValue = ({category}: {category: CategoryOptions}) => {
    setFilterValue(category);
  };

  const updateSpents = ({
    spent,
    isUpdate,
  }: {
    spent: Spent;
    isUpdate: boolean;
  }) => {
    if ([spent.name, spent.amount, spent.category].includes('')) {
      Alert.alert('Error', 'All fields are required', [{text: 'Ok'}]);
      return;
    }

    if (isUpdate) {
      const newSpents = spents.map(oldSpent =>
        oldSpent.id === spent.id ? spent : oldSpent,
      );

      setSpents(newSpents);
    } else {
      setSpents([...spents, spent]);
    }
    toggleModal();
    handleExpense({spent: undefined});
    Alert.alert(`The spent has been ${isUpdate ? 'updated' : 'created'}`, '', [
      {text: 'Ok'},
    ]);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSpentFiltered = useCallback(() => {
    if (filterValue === '') {
      setSpentsFiltered(spents);
    } else {
      const expenseFiltered = spents.filter(
        spent => spent.category === filterValue,
      );
      setSpentsFiltered(expenseFiltered);
    }
  }, [spents, filterValue]);

  const saveBudgetToAsyncStorage = useCallback(async () => {
    try {
      if (isValidBudget) {
        await AsyncStorage.setItem('savedBudget', JSON.stringify(budget));
      }
    } catch (error) {}
  }, [isValidBudget, budget]);

  const saveSpentsToAsyncStorage = useCallback(async () => {
    try {
      if (spents.length > 0) {
        await AsyncStorage.setItem('savedSpents', JSON.stringify(spents));
      }
    } catch (error) {}
  }, [spents]);

  const getSavedDataFromAsyncStorage = useCallback(async () => {
    try {
      const savedBudget = (await AsyncStorage.getItem('savedBudget')) ?? 0;
      const savedSpents = await AsyncStorage.getItem('savedSpents');
      if (savedBudget && JSON.parse(savedBudget)) {
        setBudget(JSON.parse(savedBudget));
        setIsValidBudget(true);
      }
      if (savedSpents && JSON.parse(savedSpents)) {
        setSpents(JSON.parse(savedSpents));
      } else {
        setSpents([]);
      }
    } catch (error) {}
  }, []);

  const resetApp = () => {
    Alert.alert('¿Do you want to reset the app?', 'This action is permanent', [
      {text: 'back'},
      {
        text: 'Yes, reset',
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            setBudget(0);
            setSpents([]);
            setIsValidBudget(false);
          } catch (error) {}
        },
      },
    ]);
  };

  useEffect(() => {
    handleSpentFiltered();
  }, [handleSpentFiltered]);

  useEffect(() => {
    getSavedDataFromAsyncStorage();
  }, [getSavedDataFromAsyncStorage]);

  useEffect(() => {
    saveBudgetToAsyncStorage();
  }, [isValidBudget, saveBudgetToAsyncStorage]);

  useEffect(() => {
    saveSpentsToAsyncStorage();
  }, [spents, saveSpentsToAsyncStorage]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <MainHeader />
          {isValidBudget ? (
            <BudgetControl
              budget={budget}
              spents={spents}
              resetApp={resetApp}
            />
          ) : (
            <NewBudget
              handleNewBudget={handleNewBudget}
              budget={budget}
              handleBudgetValue={handleBudgetValue}
            />
          )}
        </View>

        {isValidBudget && (
          <>
            {spents.length > 0 && (
              <SpentFilter
                filterValue={filterValue}
                handleFilterValue={handleFilterValue}
              />
            )}
            <SpentsList
              spents={spentsFiltered}
              toggleModal={toggleModal}
              handleExpense={handleExpense}
            />
          </>
        )}
      </ScrollView>

      {modal && (
        <Modal animationType="slide" visible={modal}>
          <SpentForm
            toggleModal={toggleModal}
            updateSpents={updateSpents}
            handleExpense={handleExpense}
            hanldeDeleteSpent={hanldeDeleteSpent}
            expense={expense}
          />
        </Modal>
      )}

      {isValidBudget && (
        <Pressable style={styles.pressable} onPress={toggleModal}>
          <Image
            style={styles.image}
            source={require('./src/img/new_spent.png')}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 20,
    bottom: 20,
  },
  image: {
    width: 60,
    height: 60,
  },
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400,
  },
});

export default App;
