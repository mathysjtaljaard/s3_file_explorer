/**
 * Created by mathysjt on 2/5/17.
 */
import React, {Component} from "react";
import * as S3 from "../services/aws_connection";

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

export default ListData;