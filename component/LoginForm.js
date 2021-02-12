import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false};

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({error: '', loading: true});

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((this.onLoginSuccess.bind(this)))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((this.onLoginSuccess.bind(this)))
          .catch((this.onLoginFail.bind(this)));
      });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  onLoginFail() {
    this.setState({
      loading: false,
      error: 'Authentication Failed'
    });
  }

  loadSpinner() {
    if (this.state.loading) {
      return <ActivityIndicator size="small" />
    }

    return (
        <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>
            新規登録 or ログイン
          </Text>
        </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        <View>
          <TextInput
              placeholder="user@gmail.com"
              autoCorrect={false}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              style={styles.textInput}
            
            />
        </View>
        <View style={styles.wrap}>
          <TextInput
              secureTextEntry
              placeholder="password"
              autoCorrect={false}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              style={styles.textInput}
            />
        </View>

        <View style={styles.wrap}>
          {this.loadSpinner()}
        </View>
      </View>
    )
  }
}

const styles = {
  buttonStyle: {
    margin:10,borderColor: "black", borderWidth: 1, borderSolid:10 ,width:200, height:30,backgroundColor:"blue",alignItems:"center",justifyContent: 'center'
  },
  textInput: {
    margin:10, borderWidth: 1, borderSolid:10 ,width:200,height:30
  },
  buttonText:{
    color:"white"
  }
  // スタイルを記述
}

export default LoginForm;