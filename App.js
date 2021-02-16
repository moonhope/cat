import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import firebase from 'firebase';
import LoginPage from './component/LoginPage';
import HomePage from './component/HomePage';
// import * as Notifications from 'expo-notifications'
import { Notifications } from 'expo';

class App extends Component {
  state = { loggedIn: null };

  componentDidMount() {

    this.firebaseInit();

    this.notificationSubscription = Notifications.addListener(this.handleNotification);

  }

  handleNotification = (notification) => {
    if(notification.origin === 'selected'){
      //バックグラウンドで通知
    }else if(notification.origin === 'received'){
      //フォアグラウンドで通知
      alert('通知が来ました:' + notification.data.name);
      console.log(notification.data.name);
    }
  }

  renderForm() {
    if (this.state.loggedIn) {
      return( <HomePage/> )
    } else {
      return( <LoginPage /> )
    }
  }

  firebaseInit(){

    const firebaseConfig = {
      apiKey: "AIzaSyD54tuji7mFAynSgcOF9dF6WCmYSLbEn5k",
      authDomain: "catproject-5d6e2.firebaseapp.com",
      databaseURL: "https://catproject-5d6e2.firebaseio.com",
      projectId: "catproject-5d6e2",
      storageBucket: "catproject-5d6e2.appspot.com",
      messagingSenderId: "823519038517",
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });

  }

  render() {
    return (
      <SafeAreaView>
        {this.renderForm()}
      </SafeAreaView>
    )
  }

}

const styles = {
  container: {
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

export default App;