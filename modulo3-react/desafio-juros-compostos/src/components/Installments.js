import React from "react";
import Installment from "./Installment";
import css from "./installment.module.css"


export default function Installments({ installments }) {

  return installments.length > 0 && (
  
    <div className={css.flexRow}>
      {installments.map(
        ({ montanteAcumulado, rendimentoTotal, taxaRendimento }, index) => {
          return (
      
            <Installment
              key={index}
              montanteAcumulado={montanteAcumulado}
              rendimentoTotal={rendimentoTotal}
              taxaRendimento={taxaRendimento}
              posicao={index + 1}
            />
          );
        }
      )}
    </div>
  );
}
