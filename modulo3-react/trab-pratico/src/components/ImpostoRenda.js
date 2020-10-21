import React, { Component } from "react";
import { formatMoney, formatPercent } from "../helpers/format";
import css from "./salary.module.css";

export default class ImpostoRenda extends Component {
  render() {
    const { baseIRPF, discountIRPF, percent } = this.props;

    return (
      <>
        <div>
          Base IRPF:
          <input
            type="text"
            disabled="disabled"
            value={formatMoney(baseIRPF)}
          />
        </div>
        <div>
          Desconto IRPF:
          <input
            className={css.irpf}
            type="text"
            disabled="disabled"
            value={`${formatMoney(discountIRPF)}  ${formatPercent(percent)}`}
          />
        </div>
      </>
    );
  }
}
