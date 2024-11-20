import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NewTodo() {
    return (
      <View style={styles.mainView}>
        <View style={styles.tabView}>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    mainView:
    {
        flex: 1,
        backgroundColor: '#151723',
    },
    tabView:
    {
        flex: 7,
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuView:
    {
        flex: 1,
    },
  });