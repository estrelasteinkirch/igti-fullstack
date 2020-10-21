import React, { Component } from "react";

export default class Header extends Component {
  handleInputChange = (event) => {
    const newValue = event.target.value;
    this.props.onChangeFullSalary(newValue);
  };
  render() {
    const { fullSalary } = this.props;
    return (
      <div>
        <input
          placeholder="Salário"
          type="number"
          value={fullSalary}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}
