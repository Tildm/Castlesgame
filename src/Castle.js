import React, { Component } from "react";
import "./Castle.css";
import InfoIcon from "./InfoIcon.png";
import voteIcon from "./voteIcon.png";

class Castle extends Component {
  render() {
    return (
      <div className="castleBackground">
        <div className="castles" onClick={this.props.upVote}>
          <div className="image">
            <img alt="castles" src={this.props.image} />
          </div>
          <div className="voteIcon">
            <img alt="Voting Icon" src={voteIcon} />
          </div>
        </div>
        <div className="castleName">
          <div className="castleNameText">{this.props.name} </div>
          <span className="castlePoints"> - points: {this.props.votes}</span>

          <div className="InfoIcon tooltip2">
            <span className="tooltip2 tooltiptext2">
              History of the Castles
            </span>
            <img
              alt="info button"
              src={InfoIcon}
              onClick={this.props.info}
              //onClick={this.props.infoOff}
            />
          </div>
        </div>

        <span>{this.props.advUrl}</span>

        <div className="infoText">
          {!this.props.hover && <Child text={this.props.text} />}
        </div>
      </div>
    );
  }
}

const Child = props => <div className="castleInfo">{props.text}</div>;

export default Castle;
