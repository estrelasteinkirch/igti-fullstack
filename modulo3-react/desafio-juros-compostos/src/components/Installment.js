import React from "react";
import css from "./installment.module.css";
import { formatMoney, formatPercent } from "../helpers/format";

export default function Installment({
  montanteAcumulado,
  rendimentoTotal,
  taxaRendimento,
  posicao,
}) {
  const c = rendimentoTotal >= 0 ? "positive" : "negative";
  console.log(taxaRendimento)
  return (
    <div className={`${css.border} ${css.installment}`}>
      <span className={css.position}>{posicao}</span>
      <div className={css[c]}>
        <p>{formatMoney(montanteAcumulado)}</p>
        <p>{formatMoney(rendimentoTotal)}</p>
        <p className={`${css.percentage} ${css[c]}`}>
        {formatPercent(taxaRendimento)}
        </p>
      </div>
    </div>
  );
}
