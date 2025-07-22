import React from "react";

export default function Loader({ icon }) {
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <div className="flex flex-col items-center justify-center space-y-4 animate-pulse mt-6">
      <img
        src={iconUrl}
        alt="Weather Icon"
        className="w-20 h-20 animate-spin-slow"
      />
      <p className="text-lg font-semibold text-center">
        Loading weather data...
      </p>
    </div>
  );
}
