export const formatCurrency = (value: number) => {
  const tofixedvalue = value >= 1 ? value?.toFixed(2) : value?.toFixed(6);
  return `$${tofixedvalue?.replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};

export const formatPercentage = (value: number) => {
  return `${Math.abs(value).toFixed(2)}%`;
};
