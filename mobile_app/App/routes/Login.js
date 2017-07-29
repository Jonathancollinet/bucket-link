import React, {Component} from 'react';
import {Alert, AsyncStorage, Keyboard, Text, TextInput, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Login extends Component {

  constructor() {
    super();
    this.state = { email: null, password: null };
  }

  goToRegister() {
    Actions.Register();
  }

  userLogin() {
    if (!this.state.email || !this.state.password) return;
    // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
    fetch('http://192.168.1.16:3000/v1/auth', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
    .then((response) => { 
      console.log('RESP', response)
      Keyboard.dismiss();
      if (response.status === 200) {
        return response.json()
      } else {
        Alert.alert('Invalid Credential');
      }
    })
    .then((responseData) => {
      if (responseData && responseData.token) {
        this.saveItem('token', responseData.token),
        Alert.alert('Login Success!', 'You are connected to your bucketlink account'),
        Actions.HomePage();
      }
    })
    .done();
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> BucketLink </Text>
        <Text style={styles.title}> Login below </Text>

        <View style={styles.form}>
          <TextInput
            editable={true}
            onChangeText={(email) => this.setState({email})}
            placeholder='Email Address'
            ref='email'
            returnKeyType='next'
            style={styles.inputText}
            value={this.state.email}
          />

          <TextInput
            editable={true}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='password'
            returnKeyType='next'
            secureTextEntry={true}
            style={styles.inputText}
            value={this.state.password}
          />

          <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogin.bind(this)}>
            <Text style={styles.buttonText}> Log In </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWrapper} onPress={this.goToRegister}>
            <Text style={styles.buttonText}> Register </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F4B6E',
  },
  'title': {
    color: 'white'
  },
  'form': {
    width: '80%'
  },
  'inputText': {
  },
  'buttonWrapper': {
    padding: 3,
    backgroundColor: '#000066',
  },
  'buttonText': {
    color: 'white'

  }
});


export default Login;