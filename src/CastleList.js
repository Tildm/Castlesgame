import React, { Component } from "react";
import axios from "axios";
import Castle from "./Castle";


class CastleList extends Component {
  static defaultProps = {
    castlesToGet: 2
  };
  constructor(props) {
    super(props);
    this.state = {
      castles: [],
      loading: false
    };
    this.seenCastles = new Set(this.state.castles.map(j => j.id));
    this.handelClick = this.handelClick.bind(this);

  }

  componentDidMount() {
    if (this.state.castles.length === 0) this.getCastles();
  }
  async getCastles() {

    let castles = [];
    let i = [];

    while (this.state.castles.length < this.props.castlesToGet) {

      {i = Math.floor(Math.random() * 3) }

      let res = await axios.get("https://castlesbackend.herokuapp.com/castles/");
      let {data} = res;
      let castle = data;
      let place = castle[i].name;
      let id = castle[i]._id;
      let image = castle[i].image;

      console.log("castleslength: " + castle.length);

      const isUnique = this.seenCastles.has(id);
      if (!isUnique) {
        castles.push({id, image, place, votes: 0 });

        this.seenCastles.add(id);
      } else {

      }
    // }

    this.setState(prevState => ({
      loading: false,
      castles: [...castles]
    }));
  }
}
  handelClick() {
    this.setState({ loading: true }, this.getCastles);
  }

  handelVote(id, delta) {
    this.setState(
      prevState => ({
        castles: prevState.castles.map(j =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        ),
        loading: false
      }),

      this.getCastles
    );
  }
  render() {
    if (this.state.loading) {
      return (
        <div>
          <h5>Loading...</h5>
        </div>
      );
    }
    let castles = this.state.castles.sort((a, b) => b.votes - a.votes);
    return (
      <div>
        <h1>Castles</h1>
        <div>
          {this.state.castles.map(j => (
            <Castle
              text={j.text}
              key={j.id}
              name={j.place}
              image={j.image}
              votes={j.votes}
              upVote={() => this.handelVote(j.id, +1)}

            />
          ))}
        </div>
      </div>
    );
  }
}
export default CastleList;
