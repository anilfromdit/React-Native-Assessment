import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { BookmarkProvider } from './src/context/BookmarkContext'; 

const App = () => {
  return (
    <NavigationContainer>
      <BookmarkProvider>
        <StackNavigator />
      </BookmarkProvider>
    </NavigationContainer>
  );
};

export default App;
