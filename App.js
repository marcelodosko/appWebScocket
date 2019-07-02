import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';

// const ws = new WebSocket('ws://192.168.0.30:3000/test1');

export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = { 
      messageS: '',
      messageR: '',
      nameConnection: '',
      ws: '',
    };
  }

  connectWS = () => {
    const ws = new WebSocket(`ws://192.168.43.110:3000/${this.state.nameConnection}`)
    // const ws = new WebSocket(`ws://apipaper.herokuapp.com/${this.state.nameConnection}`)
    this.setState({ ws })
    ws.onmessage = (e) => {
      this.setState({
        messageR: e.data
      })
    }

    ws.onopen = () => {
      this.state.messageS !== '' &&
        ws.send(JSON.stringify({name: this.state.nameConnection, message: this.state.messageS}))
    }

    ws.onerror = (e) => {
     console.log(e.message)
    }

    ws.onclose = (e) => {
    // connection closed
      console.log(e.code, e.reason)
    }
  }
  
  
  componentWillUnmount() {
    const { ws } = this.state
    ws.onclose()
  }
  
  render() {
    const { ws } = this.state
    return (
      <View style={styles.container}>
      { ws === '' ?
      (
        <View>
      <Text style={styles.welcome}>ingrese Nombre!</Text>
          <TextInput
            style={{height: 40, width: 150, borderColor: 'gray', borderWidth: 1}}
            onChangeText={nameConnection => this.setState({nameConnection})}
            value={this.state.nameConnection}
          />
          <Button
            onPress={this.connectWS}
            title="Connect WS"
            color="#841584"
          />
          </View>
      ) : (
        <View>
        <Text style={styles.welcome}>ingrese mensaje!</Text>
          <TextInput
            style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 1}}
            onChangeText={messageS => this.setState({messageS})}
            value={this.state.messageS}
          />
          <Button
            onPress={ws.onopen}
            title="Send Message"
            color="#841584"
          /> 
          </View>
          )
      }
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
