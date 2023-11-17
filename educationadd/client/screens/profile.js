import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios for HTTP requests

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [educationData, setEducationData] = useState(null); // New state for education data
  const[skills,setSkills]=useState(null)
  const [experience, setExperience] = useState(null);
  const navigation = useNavigation();
  const refreshInterval = 600;
  
  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData !== null) {
        setUserData(JSON.parse(storedData));
      }

      const responseEducation = await axios.get('http://192.168.76.122:5000/education');
      setEducationData(responseEducation.data);

      const responseSkills = await axios.get('http://192.168.76.122:5000/skills');
      setSkills(responseSkills.data);

      const responseExperience = await axios.get('http://192.168.76.122:5000/experiences');
      setExperience(responseExperience.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data at regular intervals
    }, refreshInterval);

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);


  const handleEdit = () => {
    navigation.navigate('EditProfile', { userData });
  };

  if (!userData || !educationData) {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png' }}
        style={styles.profileImage}
      />
      <Text style={styles.username}>Hello, {userData.username}!</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoText}>{userData.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Mobile</Text>
          <Text style={styles.infoText}>{userData.mobile}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      </View>
      <Text style={styles.educationLabel}>Education Details:</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>University</Text>
          <Text style={styles.infoText}>{educationData.university}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Degree</Text>
          <Text style={styles.infoText}>{educationData.degree}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>fieldOfStudy</Text>
          <Text style={styles.infoText}>{educationData.fieldOfStudy}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>grade</Text>
          <Text style={styles.infoText}>{educationData.grade}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>activities</Text>
          <Text style={styles.infoText}>{educationData.activities}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>startYear</Text>
          <Text style={styles.infoText}>{educationData.startYear}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>endYear</Text>
          <Text style={styles.infoText}>{educationData.endYear}</Text>
        </View>
        
      </View>


      <Text style={styles.educationLabel}>Skills:</Text>
      {skills && skills.map((skill, index) => (
        <View key={index} style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoText}>{skill.name}</Text>
          </View>
        </View>
      ))}

<Text style={styles.educationLabel}>Experiance:</Text>
      {experience && experience.map((experiance, index) => (
        <View key={index} style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoText}>{experiance.experience}</Text>
          </View>
        </View>
      ))}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Set a light background color
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#007BFF', // Add a border color
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007BFF', // Change text color to a highlight color
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#FFFFFF', // Set a white background for info container
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoItem: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF', // Change label color
  },
  infoText: {
    fontSize: 16,
    color: '#333333', // Change text color
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20, // Add some space between info and edit button
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  educationLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007BFF', // Change label color
  },
  sectionLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007BFF', // Change section label color
  },
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  skillItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007BFF', // Border color for skills items
    marginVertical: 5,
    marginRight: 10,
    backgroundColor: '#007BFF', // Background color for skills items
  },

  // Styles for text inside the skills or experience items
  skillText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
