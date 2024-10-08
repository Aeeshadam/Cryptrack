export const formatCurrency = (value: number) => {
  const tofixedvalue = value >= 1 ? value?.toFixed(2) : value?.toFixed(6);
  return `$${tofixedvalue?.replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};

export const formatPercentage = (value: number) => {
  return `${Math.abs(value).toFixed(2)}%`;
};

export const getInitials = (name: string) => {
  if (!name) return "";
  const [firstName, lastName] = name.split(" ");
  return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""}`;
};

export const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
