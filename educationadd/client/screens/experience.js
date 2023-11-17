import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
export default function Experience() {
  const [experience, setExperience] = useState('');
  const navigation = useNavigation();

  const handleInputChange = (text) => {
    setExperience(text);
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.76.122:5000/experiences', {
        experience: experience
      });
      console.log('Response from server:', response.data);
      Alert.alert("experiance added successfully")
      navigation.navigate('Home')
    } catch (error) {
      console.error('Error posting experience:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your experience..."
        value={experience}
        onChangeText={handleInputChange}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
