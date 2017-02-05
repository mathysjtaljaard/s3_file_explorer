import React, {Component} from "react";
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {selected: false, selectedObject: ''};
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(data) {
    this.setState(prevState => ({
        selected: data.selected,
        selectedObject: data.data
      })
    );
  }

  render() {

    return (
      <div className="App">
        <div>
          <ListData onChange={this.handleOnClick}/>
        </div>
        <div>
          {this.state.selected && <DisplayData data={this.state.selectedObject}/>}
        </div>
      </div>
    );
  }
}

class ListData extends React.Component {

  render() {
    return (
      <div>
        <ul>
          {this.showkeys()}
        </ul>
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
    var keyDataList = [
      {'Key': 'key1', 'Data': {'data': 'some json data1'}},
      {'Key': 'key2', 'Data': {'data': 'some json data2'}},
      {'Key': 'key3', 'Data': {'data': 'some json data3'}}];

    var dataReturned = {
      data: null,
      selected: false
    };
    console.log(value);
    for (var keyData of keyDataList ) {
      if (keyData.Key === value) {
        dataReturned.data = keyData;
        dataReturned.selected = true;
      }
    }

    this.props.onChange(dataReturned);
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
