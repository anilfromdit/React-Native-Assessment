import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobsScreen from '../screens/job-screen/JobScreen';
import BookmarksScreen from '../screens/Bookmarks/BookmarksScreen';
import Icon from 'react-native-vector-icons/FontAwesome'; 
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Jobs"
        component={JobsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="briefcase" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bookmark" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
