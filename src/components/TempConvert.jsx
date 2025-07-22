export function convertTemperature(value, unit = "C") {
  if (value === undefined || value === null || isNaN(value)) return "--";

  return unit === "C"
    ? `${value.toFixed(1)}°C`
    : `${((value * 9) / 5 + 32).toFixed(1)}°F`;
}

export default convertTemperature;
