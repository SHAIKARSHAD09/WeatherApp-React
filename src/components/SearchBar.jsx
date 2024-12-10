import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`);

      if (response.data.coord) {
        const { lat, lon } = response.data.coord;
        onSearch([lat, lon]);
      } else {
        alert('City not found');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
  <input
    type="text"
    placeholder="Search for a city..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="w-full md:w-80 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-sky-950 focus:ring-1 focus:ring-blue-500"
  />
  <button
    onClick={handleSearch}
    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    Search
  </button>
</div>

  );
}

export default SearchBar;
