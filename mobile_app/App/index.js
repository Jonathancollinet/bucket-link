import React, { Component } from 'react';
import {ActivityIndicator, AsyncStorage} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import Login from './routes/Login';
import Register from './routes/Register';
import HomePage from './routes/Homepage'; 

class App extends Component {

  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
  }

  componentWillMount() {
    AsyncStorage.getItem('token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true })
    })
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
      return (
        <Router>
          <Scene key='root'>
            <Scene
                  component={Register}
                  hideNavBar={true}
                  key='Register'
                  title='Register'
              />
            <Scene
                component={Login}
                hideNavBar={true}
                initial={!this.state.hasToken}
                key='Login'
                title='Login'
            />
            <Scene
                component={HomePage}
                initial={this.state.hasToken}
                hideNavBar={true}
                key='HomePage'
                title='Home Page'
            />
          </Scene>
        </Router>
      )
    }
  }
  
}

export default App;