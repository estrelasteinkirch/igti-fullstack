function calculetedCoumpoundInterest(initialValue, tax, months) {
  let showHTML = [];

  const montanteArray = Array(months).fill(initialValue);

  montanteArray.reduce((acc, current) => {
    let rendimento = (acc * tax) / 100;

    let montanteAcumulado = acc + rendimento;
    let rendimentoTotal = montanteAcumulado - current;
    let taxaRendimento = (rendimentoTotal / current) * 100;

    showHTML.push({ montanteAcumulado, rendimentoTotal, taxaRendimento });

    return montanteAcumulado;
  }, initialValue);

  return showHTML;
}

export { calculetedCoumpoundInterest };
