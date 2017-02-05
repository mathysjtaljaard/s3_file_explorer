import React, {Component} from "react";
import "./App.css";

class App extends Component {
  selectedKey;

  constructor(props) {
    super(props);
    this.state = {selected: false, selectedObject: ''};
  }

  render() {

    return (
      <div className="App">
        <div>
          //Section to display lists
          <ul>
            {this.showkeys()}
          </ul>
        </div>
        // section to display data
        <div>
          {this.state.selected && <DisplayData data={this.state.selectedObject}/>}
        </div>
      </div>
    );
  }

  showkeys() {
    var keys = ['key1', 'key2', 'key3'];

    return keys.map((value) => {
      return <li key={value}>
        <a href="#" onClick={(e) => this.showKeyData(value)}>
          {value}
        </a></li>
    });
  }

  showKeyData(value) {
    var keyData = [
      {'Key': 'key1', 'Data': {'data': 'some json data1'}},
      {'Key': 'key2', 'Data': {'data': 'some json data1'}},
      {'Key': 'key3', 'Data': {'data': 'some json data1'}}];


    console.log('Pressed ', value);
    return keyData.forEach((data) => {
      if (data.Key === value) {
        this.setState(prevState => ({
          selected: true,
          selectedObject: data
        }));
      }
    });
  }
}

class DisplayData extends React.Component {
  render() {
    return (<div>
              <label>{this.props.data.Key}</label>
              <textarea value={JSON.stringify(this.props.data.Data)} readOnly></textarea>
            </div>);
  }
}

export default App;
