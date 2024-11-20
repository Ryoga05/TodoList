import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoList from './pages/TodoList';
import NewTodo from './pages/NewTodo';

import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TodoList">
        <Stack.Screen name="TodoList" component={TodoList} options={{ headerShown: false ,  animation: 'none'}}/>
        <Stack.Screen name="NewTodo" component={NewTodo} options={{ headerShown: false ,  animation: 'none'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}