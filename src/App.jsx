import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastSummary from "./components/ForecastSummary";
import DarkModeToggle from "./components/DarkModeToggle";
import Loader from "./components/Loader";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("C");
  const [lastIcon, setLastIcon] = useState("01d");
  const [showForecast, setShowForecast] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = "https://api.openweathermap.org/data/2.5/forecast";

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");

    try {
      const url = `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      const forecastData = response.data;

      const today = new Date().toISOString().split("T")[0];
      const todayForecasts = forecastData.list.filter((entry) =>
        entry.dt_txt.startsWith(today)
      );

      const temps = todayForecasts.map((entry) => entry.main.temp);
      forecastData.minTempToday = Math.min(...temps);
      forecastData.maxTempToday = Math.max(...temps);
      forecastData.current = forecastData.list[0];

      const nextDays = [];
      const seenDates = new Set();
      for (let i = 0; i < forecastData.list.length; i++) {
        const entry = forecastData.list[i];
        const date = entry.dt_txt.split(" ")[0];
        if (date !== today && !seenDates.has(date)) {
          seenDates.add(date);
          nextDays.push({
            label:
              nextDays.length === 0 ? "Tomorrow" : `Day ${nextDays.length + 1}`,
            icon: entry.weather[0].icon,
            description: entry.weather[0].description,
            min: entry.main.temp_min,
            max: entry.main.temp_max,
          });
        }
        if (nextDays.length === 3) break;
      }

      forecastData.nextThreeDays = nextDays;

      if (forecastData.current?.weather?.[0]?.icon) {
        setLastIcon(forecastData.current.weather[0].icon);
      }

      setTimeout(() => {
        setWeather(forecastData);
      }, 500); // Reduced delay
    } catch (err) {
      if (err.response?.status === 404) {
        setError("City Not Found! Please try again.");
      } else {
        setError("An error occurred. Please try again later!");
      }
      setWeather(null);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500); // Reduced delay
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative min-h-screen py-2 px-4 bg-skygrid bg-starfield transition-all duration-300">
      <div className="fixed top-4 right-4 z-50">
        <DarkModeToggle />
      </div>

      <div className="dark:bg-black/90 bg-white/30 text-black/85 backdrop-blur-md z-3 border-white/30 dark:bg-white/5 dark:text-white rounded-lg shadow-lg px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 max-w-sm w-full">
        <h1 className="text-3xl font-bold text-center mb-4 font-[Pixelify_Sans]">
          Weather App
        </h1>

        <SearchBar fetchWeather={fetchWeather} />

        {loading && <Loader icon={lastIcon || "01d"} />}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            {weather && !loading && (
              <motion.div
                key={showForecast ? "forecast" : "current"}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }} // Faster slide
              >
                {showForecast ? (
                  <>
                    <ForecastSummary
                      days={weather.nextThreeDays}
                      unit={unit}
                      setUnit={setUnit}
                    />
                    <button
                      className="mt-4 underline text-blue-500 text-sm"
                      onClick={() => setShowForecast(false)}
                    >
                      Show current weather
                    </button>
                  </>
                ) : (
                  <>
                    <WeatherCard
                      weather={weather}
                      unit={unit}
                      setUnit={setUnit}
                    />
                    <button
                      className="mt-4 underline text-blue-500 text-sm"
                      onClick={() => setShowForecast(true)}
                    >
                      Show next 3 days weather
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
