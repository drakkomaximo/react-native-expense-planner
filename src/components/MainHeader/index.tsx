/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { styles } from './styles';

const MainHeader = () => {
  return (
    <SafeAreaView>
        <Text style={styles.text}>Expense Planner</Text>
    </SafeAreaView>
  );
};

export default MainHeader;
