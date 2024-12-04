import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import Todo from './Todo';

const DisplayTodos = ({
  data,
  setData,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  navigation
}) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const completedTask = () => {
    const completed = data.filter((val) => val.check);
    if (data.length) {
      const completePercentage = (completed.length / data.length) * 100;
      return completePercentage.toFixed();
    }
    return 0;
  };

  useEffect(() => {
    const filterResults = data.filter(
      (val) =>
        val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filterResults);
  }, [data, search]);

  const handleTasksStatus = () => {
    const parsePercentage = parseFloat(completedTask());
    if (parsePercentage === 0) return 'No tasks completed';
    if (parsePercentage === 100) return 'All tasks completed';
    if (parsePercentage >= 50) return 'More than half tasks completed';
    return 'Less than half tasks completed';
  };

  return (
    <ScrollView style={styles.container}>
      {data.length ? (
        <View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Progress Summary</Text>
            <Text style={styles.taskCount}>
              {`${data.length} ${data.length > 1 ? 'Tasks' : 'Task'}`}
            </Text>

            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressText}>
                  Progress{' '}
                  <Text style={[
                    styles.statusText,
                    { color: handleTasksStatus() === 'No tasks completed' ? '#DC2626' : 
                            handleTasksStatus() === 'Less than half tasks completed' ? '#DC2626' : 
                            '#10B981' }
                  ]}>
                    ({handleTasksStatus()})
                  </Text>
                </Text>
                <Text style={styles.percentageText}>{completedTask()}%</Text>
              </View>

              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${completedTask()}%` }]} />
              </View>
            </View>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search for task..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#6B7280"
          />

          <View style={styles.todoList}>
            {searchResults.map((val, index) => (
              <Todo
                key={index}
                i={index}
                val={val}
                data={data}
                setData={setData}
                setEdit={setEdit}
                setDeleteNotificationTitle={setDeleteNotificationTitle}
                setDeleteNotification={setDeleteNotification}
                navigation={navigation}
              />
            ))}
          </View>
        </View>
      ) : (
        <Text style={styles.emptyText}>You don't have any tasks</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#7C3AED',
    margin: 20,
    padding: 20,
    borderRadius: 15,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  taskCount: {
    color: '#fff',
    opacity: 0.8,
  },
  progressContainer: {
    marginTop: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    color: '#fff',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  percentageText: {
    color: '#fff',
    fontSize: 14,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#6D28D9',
    borderRadius: 4,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  searchInput: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  todoList: {
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#4B5563',
    marginTop: 40,
  },
});

export default DisplayTodos;