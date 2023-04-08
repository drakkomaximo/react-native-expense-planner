/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {styles} from './styles';
import {formatAmount} from '../../helpers';
import {Spent} from '../../../App';
import CircularProgress from 'react-native-circular-progress-indicator';

export type budgetControlProps = {
  budget: number;
  spents: Spent[];
  resetApp: () => void;
};

const BudgetControl: FC<budgetControlProps> = ({budget, spents, resetApp}) => {
  const [avaliable, setAvaliable] = useState(0);
  const [spent, setSpent] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const calculateSpents = useCallback(() => {
    const totalSpents = spents.reduce(
      (total, spentValue) => spentValue.amount + total,
      0,
    );
    const avaliableTotal = budget - totalSpents;
    const newPercentage = ((budget - avaliableTotal) / budget) * 100;
    setAvaliable(avaliableTotal);
    setTimeout(() => {
      setPercentage(newPercentage);
    }, 2000);
    setSpent(totalSpents);
  }, [spents, budget]);

  useEffect(() => {
    calculateSpents();
  }, [calculateSpents]);

  return (
    <View style={styles.container}>
      <View style={styles.imageCenter}>
        <CircularProgress
          value={percentage}
          radius={150}
          duration={1500}
          valueSuffix={'%'}
          title={'Gestated'}
          inActiveStrokeColor={'#F5F5F5'}
          inActiveStrokeWidth={20}
          activeStrokeColor={'#3B82F6'}
          activeStrokeWidth={20}
          titleStyle={{fontWeight: 'bold', fontSize: 20}}
          titleColor="#64748B"
        />
      </View>

      <Pressable style={styles.btnReset}>
        <Text style={styles.btnResetText} onLongPress={resetApp}>Reset App</Text>
      </Pressable>

      <View style={styles.textContainer}>
        <Text style={styles.value}>
          <Text style={styles.label}>Budget: {''}</Text>
          {formatAmount({amount: budget})}
        </Text>

        <Text style={styles.value}>
          <Text style={styles.label}>Avaliable: {''}</Text>
          {formatAmount({amount: avaliable})}
        </Text>

        <Text style={styles.value}>
          <Text style={styles.label}>Spent: {''}</Text>
          {formatAmount({amount: spent})}
        </Text>
      </View>
    </View>
  );
};

export default BudgetControl;
