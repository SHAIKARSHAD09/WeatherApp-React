import { FaLocationArrow } from 'react-icons/fa'; // Location icon
import { BsCalendar } from 'react-icons/bs'; // Calendar icon
import { MdWbSunny } from 'react-icons/md'; // Hot weather icon
import { MdAcUnit } from 'react-icons/md'; // Cold weather icon
import { IoMdCloud } from 'react-icons/io'; // Moderate weather icon

const WeatherCard = ({ weatherData }) => {
  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      })
    : "Date not available";

  const renderTemperatureIcon = () => {
    if (temperatureCelsius > 23) {
      return <MdWbSunny className="ml-2 text-orange-500 text-6xl" />;
    } else if (temperatureCelsius < 10) {
      return <MdAcUnit className="ml-2 text-blue-500 text-6xl" />;
    } else {
      return <IoMdCloud className="ml-2 text-gray-500 text-6xl" />;
    }
  };

  return (
    <div className="bg-sky-950 text-white rounded-md w-[300px] p-8">
      <div className="text-xl">Now</div>
      <div className="flex items-center text-4xl font-bold">
        {temperatureCelsius}°C
        {renderTemperatureIcon()}
      </div>
      <div className="text-sm mt-2 font-medium">
        {weatherDescription}
      </div>
      <div className="mt-4">
        <div className="flex items-center">
          <BsCalendar />
          {currentDate}
        </div>
        <div className="mt-1 flex items-center">
          <FaLocationArrow />
          {cityName}, {countryName}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
