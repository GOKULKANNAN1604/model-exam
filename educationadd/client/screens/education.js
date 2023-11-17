
import React from 'react';
import { Text,StyleSheet ,TouchableOpacity,View} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Education(){
    const navigation = useNavigation();
  return(<> 
  <View style={styles.container}>
  <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Addeducation')}
      >
        <Text style={styles.buttonText}>+ Add Education</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Addskils')}
      >
        <Text style={styles.buttonText}>+ Add skills</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Addexperiance')}
      >
        <Text style={styles.buttonText}>+ Add Experiance</Text>
      </TouchableOpacity>
      </View>
  </>)
}

const styles=StyleSheet.create({
    container:{
      marginTop:250
    },
    button: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingLeft:20,
        marginBottom: 10,
        textAlign:"center",
        borderRadius: 5,
        width:"60%",
        marginLeft:80
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        marginLeft:22
      },
})