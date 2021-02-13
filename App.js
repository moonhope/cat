import React, { Component } from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import firebase from 'firebase';
import LoginForm from './component/LoginForm';
import registerForPushNotificationsAsync from './component/registerForPushNotificationsAsync';
// import * as Notifications from 'expo-notifications'
import { Notifications } from 'expo';

class App extends Component {
  state = { loggedIn: null };

  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyD54tuji7mFAynSgcOF9dF6WCmYSLbEn5k",
      authDomain: "catproject-5d6e2.firebaseapp.com",
      databaseURL: "https://catproject-5d6e2.firebaseio.com",
      projectId: "catproject-5d6e2",
      storageBucket: "catproject-5d6e2.appspot.com",
      messagingSenderId: "823519038517",
    //  appId: "Your_code"
    }
    if (!firebase.apps.length) { // これをいれないとエラーになったのでいれてます。
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });

   this.notificationSubscription = Notifications.addListener(this.handleNotification);

    //badge消したり
    /*
    Notifications.getBadgeNumberAsync().then(badgeNumber => {
      if(badgeNumber !==0){
        Notifications.setBadgeNumberAsync(badgeNumber - 1);
      }
    })
    */

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
      return(
        <View>
          <TouchableOpacity onPress={() => firebase.auth().signOut()} style={styles.buttonStyle}>
            <Text style={styles.textStyle}>ログアウト</Text>
          </TouchableOpacity>
        <TouchableOpacity onPress={() => registerForPushNotificationsAsync()} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>PUSH用トークン取得</Text>
        </TouchableOpacity>
        </View>

      )
    } else {
      return(<LoginForm />)
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>{this.state.loggedIn ? "ログイン中です" : "ログインして下さい"}</Text>
        </View>
        {this.renderForm()}
      </SafeAreaView>
    )
  }
}

const styles = {
  container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center',
     },
}

export default App;