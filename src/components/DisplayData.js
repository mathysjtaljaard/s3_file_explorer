/**
 * Created by mathysjt on 2/5/17.
 */
import React, {Component} from "react";

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

export default DisplayData;