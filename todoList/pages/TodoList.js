import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { FIREBASE_STORAGE } from '../firebaseConfig'; // Importa la configuración de Firebase
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default function TodoList({ navigation }) {

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(FIREBASE_STORAGE, "TodoList"));
    const tasksArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTasks(tasksArray);
  };

  useEffect(() => {

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    Alert.alert(
      'Eliminar tarea',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await deleteDoc(doc(FIREBASE_STORAGE, "TodoList", id));
            setTasks(tasks.filter(task => task.id !== id));
          },
        },
      ],
      { cancelable: false }
    );

    fetchTasks();
  };

  const editTask = (task) => {
    navigation.navigate('NewTodo', { task }); // Pasamos la tarea a editar como parámetro
  };

  const toggleComplete = async (id) => {
    const taskRef = doc(FIREBASE_STORAGE, "TodoList", id); // Referencia al documento de la tarea
    const task = tasks.find(task => task.id === id);
    // Actualizar el campo "completed" en Firestore
    await updateDoc(taskRef, {
      completed: !task.completed, // Cambiar el estado de "completed"
    });
    // Actualizar el estado local de las tareas
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    fetchTasks();
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
        <TouchableOpacity style={styles.editButton} onPress={() => editTask(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
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
        onPress={() => navigation.navigate('NewTodo', { refreshTasks: fetchTasks })}
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