import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TodoList({ navigation }) {

  const [tasks, setTasks] = useState([
    { id: '1', title: 'Comprar leche', deadline: '2024-11-25', completed: false },
    { id: '2', title: 'Estudiar React Native', deadline: '2024-11-26', completed: false },
    { id: '3', title: 'Enviar correos', deadline: '', completed: true }, // Sin deadline
  ]);

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleComplete(item.id)}>
        <Icon
          name={item.completed ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={item.completed ? '#6200ee' : '#000'}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={item.completed ? styles.completedText : styles.taskText}>
          {item.title}
        </Text>
        <Text style={item.completed ? styles.completedText : styles.taskText}>
          {item.deadline ? `${item.deadline}` : 'Sin fecha límite'}
        </Text>
      </View>

      {/* Botones de Editar y Eliminar */}
      <View style={styles.taskActions}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('NewTodo')}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2, // Sombra para Android
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex:1,
    flexDirection: 'column',
  },
  taskText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 8,
  },
  completedText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 8,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskActions: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#6200ee',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});