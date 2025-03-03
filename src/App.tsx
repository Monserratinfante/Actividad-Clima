import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const API_KEY = "e0f4bd93279f4d9d8f440937252702"; // clave de WeatherAPI

interface WeatherData {
  id: number;
  city: string;
  temperature: number;
}

const App = () => {
  const [weatherList, setWeatherList] = useState<WeatherData[]>([]);

  const fetchWeather = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      const data = await response.json();
      const newWeather: WeatherData = {
        id: Date.now(),
        city: data.location.name,
        temperature: data.current.temp_c,
      };
      setWeatherList((prev) => [newWeather, ...prev]); // Agrega la nueva ciudad arriba
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const deleteWeather = (id: number) => {
    setWeatherList((prev) => prev.filter((weather) => weather.id !== id));
  };

  return (
    <div className="app">
      <h1>Climas de Ciudades</h1>
      <SearchBar onSearch={fetchWeather} />
      <div className="weather-container">
        {weatherList.map((weather) => (
          <WeatherCard
            key={weather.id}
            city={weather.city}
            temperature={weather.temperature}
            onDelete={() => deleteWeather(weather.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
