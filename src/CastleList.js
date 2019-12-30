import React, { Component } from "react";
import axios from "axios";
import shuffle from "shuffle-array";
import Castle from "./Castle";
import Advert from "./Advert";
import CastleTable from "./CastleTable";
import Graph from "./Graph";
import "./Graph.css";

class CastleList extends Component {
  static defaultProps = {
    castlesToGet: 2
  };
  constructor(props) {
    super(props);
    this.state = {
      randomCastles: [],
      castleInfo2: "",
      advert: 0,
      loading: false,
      hover: true
    };
  }

  componentDidMount() {
    if (this.state.randomCastles.length === 0) this.getCastles();
  }

  async getCastles() {
    let randomCastles = [];
    let rCastles = [];
    let i;

    let res = await axios.get("https://castles2.herokuapp.com/castles/");
    const castle = res.data;

    rCastles = shuffle(castle);

    for (i = 0; i <= 1; i++) {
      let image = rCastles[i].image;
      let name = rCastles[i].name;
      let vote = rCastles[i].vote;
      let text = rCastles[i].text;
      let id = rCastles[i]._id;

      randomCastles.push({ image, name, id, text, vote });
    }

    this.setState({
      randomCastles: [...randomCastles],
      loading: true
    });
  }

  handelInfo(id) {
    let castleInfo2 = this.state.randomCastles.map(c =>
      c.id === id ? c.text : null
    );

    this.setState(prevState => ({
      hover: !prevState.hover,
      castleInfo2: castleInfo2
    }));

  }


  handelVote(id, delta) {
    let vote = 0;
    let prevStateVote = this.state.randomCastles.map(c =>
      c.id === id ? c.vote + delta : 0
    );
    console.log("ADV2: " + this.props.advert2);

    this.setState(prevState => ({
      hover: true,
      advert:
        this.state.advert === 0 && this.props.advert2 === 2
          ? this.props.advert2 + 1
          : prevState.advert + 1
    }));

    prevStateVote.sort();

    for (let i = 0; i <= 1; i++) {
      prevStateVote[i] !== 0
        ? (vote = prevStateVote[i])
        : console.log(prevStateVote[i]);
    }

    axios
      .put("https://castles2.herokuapp.com/castles/" + id, { vote: vote })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    this.getCastles();
  }

  render() {
    if (!this.state.loading) {
      return (
        <div>
          <h5 style={{ color: "red" }}>Loading...</h5>
        </div>
      );
    }

    console.log("advert: " + this.state.advert);
    if (this.state.advert === 2 || this.state.advert === 6) {
      return <Advert advert2={this.state.advert} />;
    } else {
      return (
        <div>
          <Graph />
          {this.state.randomCastles.map(c => (
            <Castle
              text={c.text}
              name={c.name}
              image={c.image}
              votes={c.vote}
              key={c.id}
              id={c.id}
              advUrl={c.advUrl}
              hover={this.state.hover}
              upVote={() => this.handelVote(c.id, 1)}
              info={() => this.handelInfo(c.id)}
              infoOff={() => this.handelInfoOff()}
            />
          ))}

          <CastleTable />
        </div>
      );
    }
  }
}
export default CastleList;
