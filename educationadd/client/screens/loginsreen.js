import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StatusBar, StyleSheet ,ImageBackground,Alert} from 'react-native';
import axios from 'axios';
export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.76.122:5000/login', {
        email,
        password,
      });
  
      if (response.data.message === 'Login successful') {
        Alert.alert('Success', 'Login successful');
  
        if (response.data.user) {
          await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
        } else {
          console.warn('User data is missing in the response');
        }
  
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
    
      <Text style={styles.logo}>Student</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.signup}>
          Not a member yet?{' '}
          <Text style={styles.signupButton} onPress={handleRegister}>
            Signup
          </Text>
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width:"100%"
  },
  
  logo: {
    fontFamily: 'Roboto', // Change to the desired font family
    fontSize: 36, // Change to the desired font size
    fontWeight: 'bold', // Change to the desired font weight
    marginBottom: 50,
    color: 'black', // Set a custom color
  },
  form: {
    width: '80%',
  },
  input: {
    height: 55,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginText: {
    color: '#f0f8ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signup: {
    marginTop: 10,
    textAlign: 'center',
    
  },
  signupButton: {
    color: '#007BFF',
    fontWeight: 'bold',
    
  },
});
