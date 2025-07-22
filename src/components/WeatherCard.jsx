import React from "react";
import convertTemperature from "./TempConvert";

const WeatherCard = ({ weather, unit, setUnit }) => {
  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-xl font-medium">
        {weather.city.name}, {weather.city.country}
      </h2>
      <div className="flex flex-col items-center mb-3">
        <div className="flex flex-row flex-wrap items-center justify-center">
          <img
            src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
            alt={weather.current.weather[0].icon}
            className="w-20 h-20"
          />
          <p className="text-center min-[400px]:text-left text-3xl font-['Pixelify_Sans']">
            {convertTemperature(weather.current.main.temp, unit)}&deg; {unit}
          </p>
        </div>
        <p className="capitalize font-medium text-lg -mt-2 text-gray-300 text-center">
          {weather.current.weather[0].description}
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col min-[400px]:flex-row gap-2.5 justify-around items-center w-full">
          <div className="flex flex-col gap-1 order-2 min-[400px]:order-1 min-w-[125px]">
            <p className="text-lg text-center min-[400px]:text-left">
              <strong className="font-['Pixelify_Sans']">Max: </strong>
              {convertTemperature(weather.maxTempToday, unit, unit)}
              &deg; {unit}
            </p>
            <p className="text-lg text-center min-[400px]:text-left">
              <strong className="font-['Pixelify_Sans']">Min: </strong>
              {convertTemperature(weather.minTempToday, unit)}
              &deg; {unit}
            </p>
          </div>
          <div className="flex order-1 min-[400px]:order-2">
            <button
              onClick={() => setUnit((u) => (u === "C" ? "F" : "C"))}
              className="bg-blue-500 hover:bg-blue-600 h-full w-full text-white font-semibold p-3 rounded transition-colors min-h-[48px] min-w-[48px]"
            >
              &deg;{unit}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 justify-between items-center">
          <p className="flex flex-col items-center text-center">
            <strong>Humidity: </strong>
            {weather.current.main.humidity}%
          </p>
          <p className="flex flex-col items-center text-center">
            <strong>Pressure: </strong>
            {weather.current.main.pressure} hPa
          </p>
          <p className="flex flex-col items-center text-center">
            <strong>Wind Speed: </strong>
            {weather.current.wind.speed} m/s
          </p>
          <p className="flex flex-col items-center text-center">
            <strong>Feels Like: </strong>
            {convertTemperature(weather.current.main.feels_like, unit)}
            &deg; {unit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
