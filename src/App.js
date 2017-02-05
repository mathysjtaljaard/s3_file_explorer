import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  keys = ['key1','key2', 'key3'];

  keyData = [ {'Key':'key1', 'Data': 'some json data1'},
              {'Key':'key2', 'Data': 'some json data2'},
              {'Key':'key3', 'Data': 'some json data3'}];
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
