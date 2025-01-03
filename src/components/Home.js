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
    flex: 1,
    backgroundColor: '#EDE9FE',
  },
  header: {
    padding: 20,
    backgroundColor: '#7C3AED',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  date: {
    color: '#fff',
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
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
    fontSize: 30,
    color: '#fff',
  },
});

export default Home;
