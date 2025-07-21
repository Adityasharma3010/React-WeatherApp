import React, { useState } from "react";

const SearchBar = ({ fetchWeather }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity("");
    }
  };
  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a City or Country..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 p-2 border border-r-0 border-gray-300 rounded-l-lg outline-none max-[350px]:text-[12px]"
      />
      <button className="bg-blue-500 border border-l-0 rounded-r-lg cursor-pointer p-2 hover:bg-blue-600 transition-all duration-300 ease-in-out max-[350px]:text-sm">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
