import React from "react";
import { WiRain, WiCloudy, WiDaySunny, WiSnow, WiThunderstorm } from "react-icons/wi";

const HourlyWeather = ({ forecastData }) => {
  // Function to format timestamps into readable time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Function to map weather conditions to appropriate icons
  const getWeatherIcon = (description) => {
    if (description.includes("rain")) return <WiRain className="text-blue-400 text-3xl" />;
    if (description.includes("cloud")) return <WiCloudy className="text-gray-400 text-3xl" />;
    if (description.includes("clear")) return <WiDaySunny className="text-yellow-400 text-3xl" />;
    if (description.includes("snow")) return <WiSnow className="text-white text-3xl" />;
    if (description.includes("thunderstorm")) return <WiThunderstorm className="text-purple-400 text-3xl" />;
    return <WiCloudy className="text-gray-400 text-3xl" />; // Default icon
  };

  if (!forecastData || !forecastData.list) {
    return <div className="text-center text-white">No hourly forecast data available</div>;
  }

  // Slice the first 12 hours of forecast data
  const hourlyData = forecastData.list.slice(0, 12);

  return (
    <div className="bg-sky-950 text-white rounded-md w-full px-4 py-3">
      <h2 className="text-lg font-bold mb-4">Hourly Weather Forecast</h2>
      <div className="flex overflow-x-auto space-x-4">
        {hourlyData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-2 bg-sky-800 rounded-lg shadow-lg w-[120px]"
          >
            {/* Display time */}
            <div className="text-xs font-semibold">{formatTime(item.dt_txt)}</div>
            
            {/* Weather Icon */}
            <div className="my-2">{getWeatherIcon(item.weather[0].description)}</div>
            
            {/* Temperature */}
            <div className="text-sm font-bold">{Math.round(item.main.temp)}°C</div>
            
            {/* Weather Description */}
            <div className="text-xs capitalize">{item.weather[0].description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyWeather;
