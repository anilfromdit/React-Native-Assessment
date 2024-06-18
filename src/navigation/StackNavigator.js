import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import JobDetailScreen from '../screens/job-detail/JobDetailScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="JobDetail" component={JobDetailScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
