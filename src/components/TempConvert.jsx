export const convertTemperature = (temp, unit) => {
  if (unit === "F") {
    return ((temp * 9) / 5 + 32).toFixed(1);
  }
  return temp.toFixed(1);
};

export default convertTemperature;
