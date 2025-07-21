import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("C");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const url = `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      console.log(response.data);
      setWeather(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("City Not Found! Please try again.");
      } else {
        setError("An error occured. Please try again later!");
      }
      setWeather(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative min-h-screen px-4 bg-clouds-light bg-starfield transition-all duration-300">
      <div className="fixed top-4 right-4 z-50">
        <DarkModeToggle />
      </div>
      <div className="dark:bg-black/90 bg-white/10 backdrop-blur-md border-white/30 dark:bg-white/5 dark:text-white te rounded-lg shadow-lg px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 max-w-sm w-full">
        <h1 className="text-3xl font-bold text-center mb-4 font-[Pixelify_Sans]">
          Weather App
        </h1>
        <SearchBar fetchWeather={fetchWeather} />
        {weather && (
          <WeatherCard weather={weather} unit={unit} setUnit={setUnit} />
        )}
      </div>
    </div>
  );
}

export default App;
