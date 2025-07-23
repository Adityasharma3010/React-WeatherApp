import React, { useState } from "react";
import convertTemperature from "./TempConvert";

const ForecastSummary = ({ days, unit, setUnit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < days.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-4 pt-3 px-2">
        <h3 className="text-lg font-semibold">Next 3 Days Forecast</h3>
        <button
          onClick={() => setUnit((u) => (u === "C" ? "F" : "C"))}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded transition-colors min-h-[48px] min-w-[48px]"
        >
          &deg;{unit}
        </button>
      </div>

      {/* Slide Container */}
      <div className="relative w-full h-[180px] overflow-hidden">
        <div
          className="transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateY(-${currentIndex * (100 / 3)}%)`,
            height: `${days.length * 100}%`,
          }}
        >
          {days.map((day, index) => (
            <div
              key={index}
              className="w-full h-[180px] flex flex-col items-center justify-center bg-blue-200 dark:bg-slate-800 rounded shadow text-center p-4"
            >
              <h4 className="font-bold mb-2">{day.label}</h4>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  className="w-20 h-20"
                />
                <p className="text-3xl font-semibold">
                  {convertTemperature(day.max, unit)}
                </p>
              </div>
              <p className="capitalize font-medium text-lg text-gray-700 dark:text-gray-300 mt-2">
                {day.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          ↑
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === days.length - 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default ForecastSummary;
