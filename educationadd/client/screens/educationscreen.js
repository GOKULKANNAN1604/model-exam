// components/AddEducation.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const AddEducation = () => {
  const navigation = useNavigation();

  const [education, setEducation] = useState({
    university: '',
    degree: '',
    fieldOfStudy: '',
    grade: '',
    activities: '',
    startYear: '',
    endYear: '',
    description: ''
  });

  const handleInputChange = (field, text) => {
    setEducation({
      ...education,
      [field]: text
    });
  };

  
    const handleSubmit = async () => {
        try {
          const response = await axios.post('http://192.168.76.122:5000/education', {
            education: education // Send the education object in the request body
          });
    
          console.log('Response from server:', response.data);
          Alert.alert('Success', 'education stored successful');
          navigation.navigate('Home')
        } catch (error) {
          console.error('Error submitting education:', error);
        }
      };
 

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="University"
        value={education.university}
        onChangeText={(text) => handleInputChange('university', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Degree"
        value={education.degree}
        onChangeText={(text) => handleInputChange('degree', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Field of Study"
        value={education.fieldOfStudy}
        onChangeText={(text) => handleInputChange('fieldOfStudy', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Grade"
        value={education.grade}
        onChangeText={(text) => handleInputChange('grade', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Activities"
        value={education.activities}
        onChangeText={(text) => handleInputChange('activities', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Year"
        value={education.startYear}
        onChangeText={(text) => handleInputChange('startYear', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="End Year"
        value={education.endYear}
        onChangeText={(text) => handleInputChange('endYear', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={education.description}
        onChangeText={(text) => handleInputChange('description', text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: '#007BFF',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5, // Adds rounded corners
    backgroundColor: '#F8F9FA', // Light gray background color
    color: '#000000', // Text color
  },
});

export default AddEducation;
