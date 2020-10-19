import React, { Component } from "react";
import css from "./counter.module.css";
import IncrementButton from "./IncrementButton";
import DecrementButton from "./DecrementButton";
import Value from "./Value";
import Steps from "./Steps";

export default class Counter extends Component {
  constructor() {
    super();
    //deve ter this antes dos atributos
    this.state = {
      currentCounter: 2,
      steps: 0,
    };
  }

  handleButtonClick = (clickType) => {
    //tendo acesso a eles antes do setState, nao pode modificar ele diretamente
    const { currentCounter, steps } = this.state;
    this.setState({
      currentCounter:
        clickType === "+" ? currentCounter + 1 : currentCounter - 1,
      steps: steps + 1,
    });
  };

  render() {
    const { currentCounter, steps } = this.state;
    return (
      <div className={css.counterContainer}>
     
        <DecrementButton onDecrement={this.handleButtonClick} />

        <Value value={currentCounter}/>

        <IncrementButton onIncrement={this.handleButtonClick} />

       <Steps currentStep={steps}/>
      </div>
    );
  }
}

//criar classe com rcc tab