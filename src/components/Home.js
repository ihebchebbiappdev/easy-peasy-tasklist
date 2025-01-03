import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import DisplayTodos from '../Utils/DisplayTodos';
import DataContext from '../context/DataContext';

const Home = ({ navigation }) => {
  const {
    data,
    setData,
    edit,
    setEdit,
    setDeleteNotificationTitle,
    setDeleteNotification,
  } = useContext(DataContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>My fucking Tasks</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
      </View>
      
      <DisplayTodos
        data={data}
        setData={setData}
        edit={edit}
        setEdit={setEdit}
        setDeleteNotificationTitle={setDeleteNotificationTitle}
        setDeleteNotification={setDeleteNotification}
        navigation={navigation}
      />

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTodo')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.85, // Reduced from 1 to 0.85 (15% less)
    backgroundColor: '#EDE9FE',
  },
  header: {
    padding: 17, // Reduced from 20
    backgroundColor: '#7C3AED',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  date: {
    color: '#fff',
    marginTop: 4, // Reduced from 5
  },
  addButton: {
    position: 'absolute',
    bottom: 25, // Reduced from 30
    right: 25, // Reduced from 30
    width: 51, // Reduced from 60
    height: 51, // Reduced from 60
    borderRadius: 26, // Reduced from 30
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    fontSize: 26, // Reduced from 30
    color: '#fff',
  },
});

export default Home;