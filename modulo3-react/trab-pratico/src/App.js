import React, { Component } from "react";
import Header from "./components/Header";
import ImpostoRenda from "./components/ImpostoRenda";
import Inss from "./components/Inss";
import { calculateSalaryFrom } from "./helpers/salary";
import css from "./components/salary.module.css";
import { formatMoney, formatPercent } from "./helpers/format";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fullSalary: "", //valor vazio pro react controlar. Nao deixar null/undefined
      baseINSS: 0,
      discountINSS: 0,
      baseIRPF: 0,
      discountIRPF: 0,
      netSalary: 0,
      percINSS: 0,
      percIRPF: 0,
      percNet: 0,
    };
  }

  handleChangeFullSalary = (newValue) => {
    const calculated = calculateSalaryFrom(newValue);

    this.setState({
      fullSalary: newValue,
      baseINSS: calculated.baseINSS,
      discountINSS: calculated.discountINSS,
      baseIRPF: calculated.baseIRPF,
      discountIRPF: calculated.discountIRPF,
      netSalary: calculated.netSalary,
    });

    const percINSS = this.percent(calculated.baseINSS, calculated.discountINSS);
    const percIRPF = this.percent(calculated.baseIRPF, calculated.discountIRPF);
    const percNet = this.percent(newValue, calculated.netSalary);

    this.setState({
      percINSS,
      percIRPF,
      percNet,
    });

    console.log(newValue);
    // console.log(discountINSS);
  };

  percent = (total, discount) => {
    const percentage = (parseFloat(discount) / parseFloat(total)) * 100;
    return percentage;
  };

  render() {
    const {
      fullSalary,
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
      percINSS,
      percIRPF,
      percNet,
    } = this.state;
    return (
      <div>
        <h2 className={css.title}>React: Cálculo do Salário Líquido</h2>
        <div className={css.container}>
          Salário Bruto
          <Header
            fullSalary={fullSalary}
            onChangeFullSalary={this.handleChangeFullSalary}
          />
          <div className={css.descontos}>
            <Inss
              baseINSS={baseINSS}
              discountINSS={discountINSS}
              percent={percINSS}
            />
            <ImpostoRenda
              baseIRPF={baseIRPF}
              discountIRPF={discountIRPF}
              percent={percIRPF}
            />
          </div>
          <div>
            <p>Salário Líquido: </p>
            <span className={css.net}>
              {formatMoney(netSalary)} {formatPercent(percNet)}
            </span>
          </div>
          <div className={css.progressBar}>
            <div
              className={css.INSSBar}
              style={{ width: `${percINSS}%` }}
            ></div>
            <div
              className={css.IRPFBar}
              style={{ width: `${percIRPF}%` }}
            ></div>
            <div className={css.netBar} style={{ width: `${percNet}%` }}></div>
          </div>
        </div>
      </div>
    );
  }
}
