import React from "react";

const FiveDay = ({ forecastData }) => {
  // Format date function to convert timestamps to readable dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      weekday: "short",
    }).format(date);
  };

  if (!forecastData || !forecastData.list) {
    return <div className="text-center text-white">No forecast data available</div>;
  }

  // Filter to get one data point per day (3-hour intervals, 8 intervals per day)
  const dayData = forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 5);

  return (
    <div className="bg-sky-950 text-white rounded-md w-[300px] px-4 py-3">
      {dayData.length < 5 ? (
        <div className="text-center text-yellow-300">
          Not enough data for a 5-day forecast.
        </div>
      ) : (
        dayData.map((item, index) => (
          <div key={index} className="mb-6 flex justify-between items-center">
            <div className="text-sm font-bold">
              {Math.round(item.main.temp)}°C
            </div>
            <div className="text-sm font-bold">
              {formatDate(item.dt_txt)}
            </div>
            <div className="text-sm">
              {item.weather[0].description}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FiveDay;
