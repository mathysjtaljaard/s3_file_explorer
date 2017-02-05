import React, {Component} from "react";
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {selected: false, selectedObject: {}, displayDataObject: {}};
    this.handleOnClick = this.handleOnClick.bind(this);
    this.getDisplayData = this.getDisplayData.bind(this);
  }

  handleOnClick(childData) {
    var displayObject = this.getDisplayData(childData.data);
    this.setState(prevState => ({
        selected: childData.selected,
        selectedObject: childData.data,
        displayDataObject: displayObject
      })
    );
  }

  getDisplayData(object) {
    var jsonData = JSON.stringify(object.Data, undefined, 4);
    var rows = jsonData.split('\n').length;
    return {
      key: object.Key,
      jsonData: jsonData,
      rows: rows,
      cols: 50
    };
  }

  render() {

    return (
      <div className="App">
        <div>
          <ListData onChange={this.handleOnClick}/>
        </div>
        <div>
          {this.state.selected && <DisplayData data={this.state.displayDataObject}/>}
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
      {'Key': 'key1',
        'Data':
          {'data': 'some json data1',
            'more': 'more details for 1',
            'more1': 'more details for 1',
            'more2': 'more details for 1'
          }
      },
      {'Key': 'key2',
        'Data':
          {'data': 'some json data2',
            'more': 'more details for 2',
            'more1': 'more details for 2',
            'more2': 'more details for 2',
            'more3': 'more details for 2'
          }
      },
      {'Key': 'key3',
        'Data':
          {'data': 'some json data3',
            'more': 'more details for 3',
            'more1': 'more details for 3',
            'more2': 'more details for 3',
            'more3': 'more details for 3',
            'more4': 'more details for 3'
          }
      }
    ];

    var dataReturned = {
      data: null,
      selected: false
    };
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

  constructor(props) {
    super(props);
    this.state = { rows: 2, cols: 50, data: ''};
  }

  render() {
    return (<div>
      <div>
        <label>{this.props.data.key}</label>
      </div>
      <div>
        <textarea rows={this.props.data.rows} cols={this.props.data.cols} value={this.props.data.jsonData} readOnly>

        </textarea>
      </div>
    </div>);
  }


}

export default App;
