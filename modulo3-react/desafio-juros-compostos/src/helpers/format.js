const formatMoney = (number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
};

const formatPercent = (number) => {
  const formated = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
    return `${formated} %`;

};

export { formatMoney, formatPercent };