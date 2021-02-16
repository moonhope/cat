import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import firebase from 'firebase';
import getExpoToken from './getExpoToken';

class HomePage extends Component {
 
  render() {
    return (
      <View>
        <Text>ログイン中です</Text>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => getExpoToken()} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>PUSH用トークン取得</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => firebase.auth().signOut()} style={styles.textLink} >
            <Text>ログアウト</Text>
          </TouchableOpacity>
        </View>
     </View>
    )
  }
}

const styles = {
  container: {
      // flex: 1,
       marginTop:'70%',
       backgroundColor: 'white',
       alignItems: 'center',
       justifyContent: 'center',
  },
  buttonStyle: {
    margin:10, borderColor: "orange", borderWidth: 1, borderStyle:'solid' ,width:200, height:30,backgroundColor:"orange",alignItems:"center",justifyContent: 'center'
  },
  buttonText:{
    color:"white"
  },
  textLink:{
    color:"white",
    margin:"30%"
  }

}

export default HomePage;