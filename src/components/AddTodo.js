import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import FormInputs from '../Utils/FormInputs';
import DataContext from '../context/DataContext';

const AddTodo = () => {
  const { data, setData, setAddNotification, setAddNotificationTitle } =
    useContext(DataContext);

  return (
    <View style={styles.container}>
      <FormInputs
        data={data}
        setData={setData}
        setAddNotification={setAddNotification}
        setAddNotificationTitle={setAddNotificationTitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7C3AED',
    padding: 20,
  },
});

export default AddTodo;