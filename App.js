import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , TextInput , Button} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TextInput placeholder="Email adress" style={{width: 250 , height: 30, borderColor: "black", borderWidth: 1, borderSolid: 10}}></TextInput>
      <TextInput placeholder="password" style={{margin:20, width: 250 , height: 30, borderColor: "black", borderWidth: 1, borderSolid: 10}}></TextInput>
      <Button title="送信" style={{  borderColor: "black", borderWidth: 1, borderSolid:10 }} onPress={() => this.signUp()} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
