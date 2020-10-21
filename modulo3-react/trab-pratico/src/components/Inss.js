import React, { Component } from "react";
import { formatMoney, formatPercent } from "../helpers/format";

import css from "./salary.module.css";

export default class Inss extends Component {
  render() {
    const { baseINSS, discountINSS, percent } = this.props;

    return (
      <>
        <div>
          <span>Base INSS:</span>
          <input
            type="text"
            disabled="disabled"
            value={formatMoney(baseINSS)}

          />
        </div>
        <div>
          <span>Desconto INSS:</span>
          <input
            className={css.inss}
            type="text"
            disabled="disabled"
            value={`${formatMoney(discountINSS)}  ${formatPercent(percent)}`}

          />
        </div>
      </>
    );
  }
}
