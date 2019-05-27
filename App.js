/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Form, TextInput, Button} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const ws = new WebSocket('ws://apipaper.herokuapp.com/echo');

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = { 
      messageS: '',
      messageR: ''
    };
  }
  componentWillMount() {
   ws.onmessage = (e) => {
     this.setState({
       messageR: e.data
     })
    }

     ws.onopen = () => {
      ws.send(this.state.messageS)
    }

    ws.onerror = (e) => {
     console.log(e.message)
    }

    ws.onclose = (e) => {
    // connection closed
      console.log(e.code, e.reason)
    }
  }

  handleChanheMessage = (e) => {
    this.setState({
      message: e.target.value
    })
  }
  // componentWillUnmount() {
  //   ws.onclose()
  // }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>ingrese mensaje!</Text>
          <TextInput
            style={{height: 40, width: 150, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(messageS) => this.setState({messageS})}
            value={this.state.messageS}
          />
          <Button
            onPress={ws.onopen}
            title="Send Message"
            color="#841584"
          />
        <Text style={styles.welcome}>{this.state.messageR}</Text>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
