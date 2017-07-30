import React, {Component} from 'react';
import {Alert, AsyncStorage, Text, TextInput, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      email: null,
      firstname: null,
      password: null
    };
  }

  goToLogin() {
    Actions.Login();
  }

  userSignup() {
    if (!this.state.email || !this.state.firstname || !this.state.password) return;
    // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
    fetch('http://192.168.1.16:3000/v1/users', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        firstname: this.state.firstname,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData && responseData.token) {
        this.saveItem('token', responseData.token),
        Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!'),
        Actions.HomePage();
      }
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> BucketLink </Text>
        <Text style={styles.title}> Register below </Text>

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
            onChangeText={(firstname) => this.setState({firstname})}
            placeholder='Firstname'
            ref='firstname'
            returnKeyType='next'
            style={styles.inputText}
            value={this.state.firstname}
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

          <TouchableOpacity style={styles.buttonWrapper} onPress={this.userSignup.bind(this)}>
            <Text style={styles.buttonText}> Register </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWrapper} onPress={this.goToLogin}>
            <Text style={styles.buttonText}> Log In </Text>
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

export default Register;