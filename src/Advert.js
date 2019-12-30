import React, { Component } from "react";
import axios from "axios";
import shuffle from "shuffle-array";
import CastleList from "./CastleList";
import "./Advert.css";
import arrowIconStr from "./arrowIconStr.png";

class Advert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomAdvert: [],
      show: true,
      advert2: this.props.advert2
    };
    this.handleClick = this.handleClick.bind(this);
    this.advertClick = this.advertClick.bind(this);
  }

  componentDidMount() {
    if (this.state.randomAdvert.length === 0) this.getAdvert();
  }
  async getAdvert() {
    let randomAdvert = [];
    let rImages = [];
    let i;

    let res = await axios.get("https://castles2.herokuapp.com/castles/");
    const advImages = res.data;

    rImages = shuffle(advImages);

    for (i = 0; i <= 0; i++) {
      let image = rImages[i].image;
      //let name = rImages[i].name;
      let id = rImages[i]._id;

      randomAdvert.push({ image, id });
    }

    this.setState({
      randomAdvert: [...randomAdvert]
    });
  }

  handleClick() {
    this.setState({
      show: false
    });
  }

  advertClick() {
    this.getAdvert();
  }

  render() {
    const advert = this.state.randomAdvert.map(a => (
      <div className="advert">
        <div onClick={this.advertClick}>
          <img src={a.image} alt="advert" />
          <div className="arrow">
            <img src={arrowIconStr} alt="arrow right" />
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        {this.state.show ? (
          <div className="container">
            <div className="backToCG">
              <div onClick={this.handleClick}>
                <span className="backToCGtext">
                  Go back to the Castles Games
                </span>
              </div>
            </div>
            {advert}

            <div className="homepageTC">
              <a href="https://www.w3schools.com/html/">
                Please visit our home page:{" "}
                <span className="advUrlTC">TomCarpenter</span>
              </a>
            </div>
          </div>
        ) : (
          <CastleList advert2={this.state.advert2} />
        )}
      </div>
    );
  }
}

export default Advert;
