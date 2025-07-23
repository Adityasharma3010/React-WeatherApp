import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const SearchBar = ({ fetchWeather }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.length > 2) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 300); // debounce

    return () => clearTimeout(handler);
  }, [query]);

  const fetchSuggestions = async (query) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${API_KEY}`
      );

      // Remove duplicates: city + state + country
      const unique = res.data.filter(
        (item, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.name === item.name &&
              t.state === item.state &&
              t.country === item.country
          )
      );

      setSuggestions(unique);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const handleSelect = (item) => {
    const fullCityName = `${item.name}${item.state ? ", " + item.state : ""}, ${
      item.country
    }`;
    setQuery(fullCityName);
    setShowSuggestions(false);
    setQuery("");
    setSuggestions([]);
    fetchWeather(fullCityName);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        handleSelect(suggestions[activeIndex]);
      } else if (query.trim()) {
        setSuggestions([]);
        fetchWeather(query.trim());
      }
    }
  };

  return (
    <div className="relative mb-4">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter city name"
        className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-900 dark:text-white"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() =>
          query && suggestions.length > 0 && setShowSuggestions(true)
        }
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white dark:bg-slate-800 shadow-md mt-1 max-h-60 overflow-y-auto rounded border border-gray-200 dark:border-gray-700">
          {suggestions.map((item, index) => (
            <li
              key={`${item.name}-${index}`}
              className={`p-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-slate-700 ${
                index === activeIndex ? "bg-blue-100 dark:bg-slate-700" : ""
              }`}
              onMouseDown={() => handleSelect(item)}
            >
              {item.name}
              {item.state ? `, ${item.state}` : ""}, {item.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
