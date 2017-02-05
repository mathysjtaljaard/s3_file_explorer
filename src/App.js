import React, {Component} from "react";
import "./App.css";
import * as S3 from "./services/aws_connection";

//import ListData from "components/DataList";
//import DataDisplay from "components/DisplayData"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      selectedObject: {},
      displayDataObject: {},
      bucketDataList: {}
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.getDisplayData = this.getDisplayData.bind(this);
    this.getData();
  }

  render() {
    return (
      <div className="App">
        <div>
          <ListData onChange={this.handleOnClick} keyList={this.state.bucketDataList}/>
        </div>
        <div>
          {this.state.selected && <DisplayData data={this.state.displayDataObject}/>}
        </div>
      </div>
    );
  }

  getData() {
    S3.listObjects().then((data) => {
      if (data && data.Contents) {
        var keyList = [];
        data.Contents.forEach((value) => {
          keyList.push(value.Key);
        });
      }
      return Promise.resolve(keyList);
    }).then((keyList) => {
      this.setState(prevState => ({
        bucketDataList: keyList
      }));
    }).catch((err) => {
      console.log(err);
    });

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
    var jsonData = JSON.stringify(JSON.parse(new Buffer(object.Body).toString()), undefined, 4);
    var rows = jsonData.split('\n').length;

    var json = {
      LastModified: object.LastModified,
      ContentType: object.ContentType,
      Body: object.Body,
      Metadata: object.Metadata
    };
    return {
      key: object.Key,
      rawData: JSON.stringify(json),
      jsonData: new Buffer(object.Body).toString(),
      rows: rows,
      cols: 50
    };
  }
}

class ListData extends React.Component {

  render() {
    return (
      <div>
        <ul>
          {this.showKeys()}
        </ul>
      </div>
    );
  }

  showKeys() {
    var keys = this.props.keyList;
    if (keys && keys.length > 0) {
      return keys.map((value) => {

        if (value.endsWith('/')) {
          return <li key={value}>
            Folder:  {value}
            </li>
        } else {
          return <li key={value}>
            File: <a href="#" onClick={(e) => this.showKeyData(value)}>
              {value}
            </a></li>
        }
      });
    } else {
      return <div> ... retrieving data </div>;
    }

  }

  showKeyData(value) {
    var dataReturned = {
      data: null,
      selected: false
    };

    console.log('value in showKeyData', value);
    S3.getObject(value).then((data) => {
      console.log('object data returned', JSON.stringify(data));
      dataReturned.data = data;
      dataReturned.selected = true;
      this.props.onChange(dataReturned);
    }).catch((err) => {
      console.log('error during getObject', err);
      this.props.onChange(dataReturned);
    });
  }
}

class DisplayData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rows: 2, cols: 50, data: ''};
  }

  render() {
    return (<div>
      <div>
        <label>{this.props.data.key}</label>
      </div>
      <div>
        <label>Raw Data</label><p/>
        <textarea rows={this.props.data.rows} cols={this.props.data.cols} value={this.props.data.rawData} readOnly>
        </textarea>
      </div>
      <div>
        <label>Body Data</label><p/>
        <textarea rows={this.props.data.rows} cols={this.props.data.cols} value={this.props.data.jsonData} readOnly>
        </textarea>
      </div>
    </div>);
  }
}

export default App;
