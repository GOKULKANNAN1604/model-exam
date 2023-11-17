
import React from 'react';
import { Text,StyleSheet } from 'react-native';


export default function Admin(){

  return(<>
  
    <Text style={styles.text}>Welcome Admin!</Text>
  </>)
}

const styles=StyleSheet.create({
    text:{
        fontSize:20,
        fontWeight:"bold",
        alignItems:"center",
        marginHorizontal:110,
        marginVertical:300
    }
})