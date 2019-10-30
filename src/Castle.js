import React, { Component } from "react";
import "./Castle.css";

class Castle extends Component {
  getColor() {
    if (this.props.votes > 10) {
      return "red";
    } else if (this.props.votes > 6) {
      return "orange";
    } else if (this.props.votes > 3) {
      return "yellow";
    } else {
      return "green";
    }
  }

  render() {
    return (
      <div className="Castle">
        <div className="Castle-buttons">
          <i

            onClick={this.props.upVote}
          />
          <span className="Castle-votes" style={{ borderColor: this.getColor() }}>
            {this.props.votes}
          </span>

        </div>
        <div className="castles" onClick={this.props.upVote}>
          <div>
          <h3>{this.props.name}</h3>
          <img style={{width:"250px"}} src = {this.props.image}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Castle;
