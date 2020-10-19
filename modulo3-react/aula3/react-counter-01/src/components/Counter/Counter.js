import React, { Component } from "react";
import css from "./counter.module.css";

export default class Counter extends Component {
  constructor() {
    super();

    this.currentCounter = 2; //deve ter this antes dos atributos
  }

  handleClick = () => {
    this.currentCounter--;
    this.render();
  };
  render() {
    return (
      <div className={css.counterContainer}>
        <h2 className="minha-classe"> Contando </h2>
        <button className="waves-effect waves-light btn red darken-4">-</button>
        <span className={css.counterValue}>{this.currentCounter}</span>
        <button className="waves-effect waves-light btn green darken-4">
          +
        </button>
      </div>
    );
  }
}

//criar classe com rcc tab
