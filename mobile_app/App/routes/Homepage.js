import React, {Component} from 'react';
import {Alert, AsyncStorage, StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';

class HomePage extends Component {

  getSOON() {
    Alert.alert('Soon Your Buckets')
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Logout Success!');
      Actions.Login();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.buttonWrapper} onPress={this.getSOON}>
          <Text style={styles.buttonText}> Get Buckets ?! </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogout}>
          <Text style={styles.buttonText} > Log out </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonText: {
    color: 'white'
  },
  buttonWrapper: {
    borderColor: '#000066',
    backgroundColor: '#000066',
    borderWidth: 1,
    borderRadius: 3,
  },
});

export default HomePage;