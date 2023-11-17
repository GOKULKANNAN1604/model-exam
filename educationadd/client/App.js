
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/loginsreen';
import Register from './screens/registerscreen';
import HomeScreen from './screens/homescreen';
import WelcomeScreen from './screens/welcomeSreen';
import EditProfileScreen from './screens/editprofilescreen';
import AdminLoginScreen from './screens/adminloginscreen';
import AdminRegister from './screens/adminregisterscreen';
import Admin from './screens/admin';
import AddEducation from './screens/educationscreen';
import Profile from './screens/profile';
import Skills from './screens/skills';
import Experience from './screens/experience';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name='AdminLogin' component={AdminLoginScreen} options={{ headerShown: true }} />
        <Stack.Screen name='AdminRegister' component={AdminRegister} options={{ headerShown: true }} />
        <Stack.Screen name='Admin' component={Admin} options={{ headerShown: true }} />
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='EditProfile' component={EditProfileScreen} options={{ headerShown: true }} />
        <Stack.Screen name='Profile' component={Profile} options={{ headerShown: true }} />
        <Stack.Screen name='Addeducation' component={AddEducation} options={{ headerShown: true }} />
        <Stack.Screen name='Addskils' component={Skills} options={{ headerShown: true }} />
        <Stack.Screen name='Addexperiance' component={Experience} options={{ headerShown: true }} />
      </Stack.Navigator>
      </NavigationContainer>
  )
}
export default App;