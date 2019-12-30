import React, { Component } from "react";
import CastleList2 from "./CastleList2";

class Table extends Component {
  render(){
    return(
      <div>
      <h3>Table</h3>
      <p>{this.props.votes}</p>
      </div>
    )
  }
}

export default Table;
