import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import Highlight from "../../src/components/Highlight";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompressIcon from '@mui/icons-material/Compress';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import '../index.css';

const TodayHighlights = ({ weatherData, airQualityData }) => {
  const { main, visibility, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi;
  const { co, no, no2, o3 } = airQualityData?.components || {};

  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  const highlights = [
    { title: "Humidity", value: `${main.humidity}%`, Icon: InvertColorsIcon },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      Icon: CompressIcon,
    },
    {
      title: "Visibility",
      value: `${visibility / 1000} km`,
      Icon: VisibilityIcon,
    },
    {
      title: "Feels Like",
      value: `${main.feels_like}°C`,
      Icon: DeviceThermostatIcon,
    },
  ];

  return (
    <div className="bg-sky-950 text-white w-full md:w-[1000px] md:h-[531px] rounded p-8 grid grid-cols-2 gap-4">
      <div className="grid grid-cols-1 gap-10">
        <div className="bg-sky-700 text-white p-2 rounded w-full md:w-[450px] md:h-[214px]">
          <div className="flex justify-between text-xl">
            <p>Air Quality Index</p>
            <div className={`mt-4 p-8 text-sm font-bold bg-green-500 h-5 w-12 rounded text-center flex items-center justify-center`}>
              {renderAirQualityDescription(airQualityIndex)}
            </div>
          </div>
          <div className="mt-4">
            <AirIcon className="text-3xl" />
            <div className="mt-4 grid grid-cols-4 gap-2">
              <div>
                <p className="font-bold">CO</p>
                <p>{co} µg/m³</p>
              </div>
              <div>
                <p className="font-bold">NO</p>
                <p>{no} µg/m³</p>
              </div>
              <div>
                <p className="font-bold">NO₂</p>
                <p>{no2} µg/m³</p>
              </div>
              <div>
                <p className="font-bold">O₃</p>
                <p>{o3} µg/m³</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-sky-700 text-white p-4 rounded w-full md:w-[450px] md:h-[214px]">
          <div className="text-xl">
            <p>Sunrise And Sunset</p>
            <div className="flex justify-between px-2 mt-2">
              <div className="text-center">
                <WbSunnyIcon className="text-4xl" />
                <p className="text-2xl">{new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
              </div>
              <div className="text-center">
                <NightsStayIcon className="text-4xl" />
                <p className="text-2xl">{new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10">
        {highlights.map((highlight, index) => (
          <Highlight
            key={index}
            title={highlight.title}
            value={highlight.value}
            Icon={highlight.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default TodayHighlights;
