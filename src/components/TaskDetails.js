import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';

const TaskDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  
  const [details, setDetails] = React.useState(null);

  React.useEffect(() => {
    const loadDetails = async () => {
      const items = await AsyncStorage.getItem('todoItems');
      if (items) {
        const parsedItems = JSON.parse(items);
        const taskDetails = parsedItems.find(val => val.id.toString() === id);
        setDetails(taskDetails);
      }
    };
    loadDetails();
  }, [id]);

  if (!details) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Task not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Task Details</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Task Name:</Text>
          <Text style={styles.value}>{details.title}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>
            {details.description ? details.description : '-'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Created:</Text>
          <Text style={styles.value}>{details.currentTime}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Complete:</Text>
          <Text style={styles.value}>
            {details.check ? 'Completed' : 'Not completed'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Category:</Text>
          <View style={styles.categoryContainer}>
            {details.catagory.map((val, index) => (
              <View key={index} style={styles.category}>
                <Text style={styles.categoryText}>
                  {val.emoji} {val.catagory}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7C3AED',
  },
  card: {
    backgroundColor: '#8B5CF6',
    margin: 20,
    padding: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailRow: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  category: {
    backgroundColor: '#7C3AED',
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TaskDetails;