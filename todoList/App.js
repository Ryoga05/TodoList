import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoList from './pages/TodoList';
import NewTodo from './pages/NewTodo';

import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="TodoList" component={TodoList} options={{ headerShown: true, animation: 'none' }} />
      <InsideStack.Screen name="NewTodo" component={NewTodo} options={{ headerShown: true, animation: 'none' }} />
    </InsideStack.Navigator>
  );
}