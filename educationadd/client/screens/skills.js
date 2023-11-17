import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Skills() {
  const [skill, setSkill] = useState('');
  const navigation = useNavigation();
  const handleInputChange = (text) => {
    setSkill(text);
  };

  const handleSaveSkill = async () => {
    try {
      await axios.post('http://192.168.76.122:5000/skills', { name: skill });
      console.log(`Skill saved: ${skill}`);
      setSkill('');
      Alert.alert('skills added successfully')
      navigation.navigate('Home')
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Skills</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a skill"
        value={skill}
        onChangeText={handleInputChange}
      />
      <Button title="Save Skill" onPress={handleSaveSkill} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
