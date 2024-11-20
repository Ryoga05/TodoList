// NewTask.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { FIREBASE_STORAGE } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';



const NewTodo = ({ navigation, route}) => {
  const { refreshTasks } = route.params;

  const { task } = route.params || {}; // Recibimos la tarea a editar

  const [title, setTitle] = useState(task ? task.title : '');
  const [dueDate, setDueDate] = useState(task ? task.dueDate : '');
  const [hasDueDate, setHasDueDate] = useState(false);

  // Función para manejar el cambio del switch
  const toggleDueDate = () => setHasDueDate((previousState) => !previousState);

  // Función para manejar la acción de guardar
  const handleSave = async () => {
    if (!title) {
      alert('El título es obligatorio');
      return;
    }
    
    try {
      await addDoc(collection(FIREBASE_STORAGE, "TodoList"), {
        title: title,
        deadline: hasDueDate ? dueDate : null,
        completed: false
      });

      refreshTasks();
      navigation.goBack(); // Regresar a la pantalla principal
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />
      
      <View style={styles.dueDateContainer}>
        <TouchableOpacity onPress={toggleDueDate}>
          <Icon
            name={hasDueDate ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={hasDueDate ? '#6200ee' : '#000'}
          />
        </TouchableOpacity>
        <Text style={styles.dueDateText}>Has due date?</Text>
      </View>

      {hasDueDate && (
        <TextInput
          style={styles.input}
          placeholder="Enter due date (e.g., 2023-01-01)"
          value={dueDate}
          onChangeText={setDueDate}
        />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dueDateText: {
    fontSize: 16,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewTodo;
