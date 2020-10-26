const formatMoney = (number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
};

const formatPercent = (number) => {
  const formated = new Intl.NumberFormat("pt-BR", { maximumSignificantDigits: 4 }).format(number);
    return `(${formated} %)`;

};

export { formatMoney, formatPercent };
