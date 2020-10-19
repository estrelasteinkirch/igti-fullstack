import React, { Component } from "react";
import { getNewTimestamp } from "./helpers/dateTimeHelpers.js";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      clickArray: [],
    };
  }
  handleClick = () => {
    const newClickArray = Object.assign([], this.state.clickArray);
    newClickArray.push(getNewTimestamp()); //cópia do objeto e insere num novo vazio
    this.setState({ clickArray: newClickArray }); // substitui todo o estado = imutabilidade
  };


  //atualizaçao document.title com a quantidade de clicks
  componentDidUpdate(){
    document.title = this.state.clickArray.length.toString();
  }

  render() {
    const { clickArray } = this.state;
    return (
      <div>
        <h1>
          React e <em>Class Components</em>
        </h1>

        <button onClick={this.handleClick}>Click aqui</button>
        <ul>
          {clickArray.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    );
  }
}