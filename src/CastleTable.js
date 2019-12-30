import React, { Component } from "react";
import axios from "axios";
import "./Castle.css";
import "./Tabelle.css";
import IconTableWhite from "./IconTableWhite.png";
import Advert from "./Advert";

class CastleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCastles: [],
      toggle: true,
      turnOffTable: this.props.showTable || true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    let res = await axios.get("https://castles2.herokuapp.com/castles/");
    const allCastles = res.data;


    this.setState(prevstate => ({
      toggle: !prevstate.toggle,
      allCastles: allCastles
    }));
  }

  render() {
    let allCastles = this.state.allCastles.sort((a, b) => b.vote - a.vote);
    const allCastlesList = this.state.allCastles.map(j => (
      <div>
        <li className="listItems">
          {j.name}
          <div style={{ color: "orangered", fontWeight: "bold" }}>{j.vote}</div>
        </li>
      </div>
    ));

    console.log("showTable: " + this.state.turnOffTable);

    if (this.state.toggle && allCastlesList) {
      return (
        <div className="IconTable tooltip">
          <span className="tooltiptext">Table of Austrian Castles</span>
          <img
            src={IconTableWhite}
            alt="Table of Austrian Castles"
            onClick={this.handleClick}
          />
        </div>
        // <button className="TabelleButon" onClick={this.handleClick}>
        //   Table
        // </button>
      );
    } else if (!this.state.toggle && allCastlesList) {
      return (
        <div className="Container">
          <div>
            <div className="IconTable">
              <img
                src={IconTableWhite}
                alt="Table of Austrian Castles"
                onClick={this.handleClick}
              />
            </div>

          </div>
          <div className="Tabelle">
            <div className="TabelleListHeader">
              <div className="Titles">Games of Austrian Castles</div>
              <div className="Titles">POINTS</div>
            </div>

            <div className="TabelleList">{allCastlesList}</div>
          </div>
        </div>
      );
    }
  }
}
export default CastleTable;
