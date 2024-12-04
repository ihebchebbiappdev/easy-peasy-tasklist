import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Todo = ({
  i,
  val,
  data,
  setData,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  navigation
}) => {
  const handleDelete = async () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            const deleteData = data.filter((item) => item.id !== val.id);
            setData(deleteData);
            await AsyncStorage.setItem('todoItems', JSON.stringify(deleteData));
            setDeleteNotificationTitle(val.title);
            setDeleteNotification(true);
            setTimeout(() => {
              setDeleteNotification(false);
              setDeleteNotificationTitle('');
            }, 4000);
          },
          style: 'destructive'
        }
      ]
    );
  };

  const handleCheck = async () => {
    const doneData = data.map((item) =>
      item.id === val.id ? { ...item, check: !item.check } : item
    );
    setData(doneData);
    await AsyncStorage.setItem('todoItems', JSON.stringify(doneData));
  };

  const handleEdit = () => {
    setEdit({
      id: val.id,
      title: val.title,
      description: val.description,
      check: val.check,
      currentTime: val.currentTime,
      catagory: val.catagory,
    });
    navigation.navigate('EditTodo');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.checkbox}
        onPress={handleCheck}
      >
        {val.check && <View style={styles.checked} />}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, val.check && styles.strikethrough]}>
          {val.title}
        </Text>
        {val.description && (
          <Text style={[styles.description, val.check && styles.strikethrough]}>
            {val.description}
          </Text>
        )}
        <Text style={styles.time}>{val.currentTime}</Text>

        {val.catagory && val.catagory.length > 0 && (
          <View style={styles.categories}>
            {val.catagory.map((cat, index) => (
              <View key={index} style={styles.category}>
                <Text style={styles.categoryText}>
                  {cat.emoji} {cat.catagory}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={handleEdit}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#7C3AED',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#7C3AED',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  description: {
    color: '#4B5563',
    marginTop: 5,
  },
  time: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 5,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  category: {
    backgroundColor: '#EDE9FE',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  categoryText: {
    color: '#7C3AED',
    fontSize: 12,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: '#7C3AED',
  },
  deleteButton: {
    backgroundColor: '#DC2626',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default Todo;