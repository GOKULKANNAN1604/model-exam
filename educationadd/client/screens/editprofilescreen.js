import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const EditProfileScreen = ({ route, navigation }) => {
  const { userData } = route.params;
  const [newUsername, setNewUsername] = useState(userData.username);
  const [newEmail, setNewEmail] = useState(userData.email);
  const [newMobile, setNewMobile] = useState(userData.mobile);

  const handleSave = async () => {
    try {
      // Update the userData state with edited information
      const updatedUserData = { ...userData, username: newUsername, email: newEmail, mobile: newMobile };

      // Store the updated data in AsyncStorage
      // For simplicity, I'm not using AsyncStorage in this example. You should implement this in your code.
      // await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

      // Display an alert to simulate success
      Alert.alert('Success', 'Profile updated successfully');

      // Navigate back to the profile screen
      navigation.goBack({ userData: updatedUserData });
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="New Username"
        value={newUsername}
        onChangeText={text => setNewUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="New Email"
        value={newEmail}
        onChangeText={text => setNewEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="New Mobile Number"
        value={newMobile}
        keyboardType="numeric"
        onChangeText={text => setNewMobile(text)}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '90%',
    fontSize: 18,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
