import React, { Component } from "react";
import "./Graph.css";

class Graph extends Component {
  render() {
    return (
      <div>
        <div className="headlineBackground">
          <div className="headline">Castles Games</div>
        </div>
        <div className="container">I'm waiting for the night to fall</div>
        <div className="advUrl">
          {" "}
          <a href="https://www.w3schools.com/html/">TomCarpenter</a>
        </div>
      </div>
    );
  }
}
export default Graph;
