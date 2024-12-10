import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterDramaTwoToneIcon from '@mui/icons-material/FilterDramaTwoTone';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { Link } from "react-router-dom";

const Navbar = ({ onSearch, onLocationSearch }) => {
  const [searchCity, setSearchCity] = useState("");

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
    }
  };

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Current coordinates: Latitude ${latitude}, Longitude ${longitude}`);
          // Call the function to search weather for the current location
          if (onLocationSearch) {
            onLocationSearch(latitude, longitude);
          }
        },
        (error) => {
          console.error("Error fetching current location:", error);
          alert("Unable to retrieve your location. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <nav className="p-2 px-8 bg-gray-800 text-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FilterDramaTwoToneIcon />
          <p className="font-bold text-lg">Weather</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/" className="px-4 hover:underline text-white">Home</Link>
          <Link to="/about" className="px-4 hover:underline text-white">About</Link>
          <TextField
            variant="outlined"
            placeholder="Search city 'London'"
            size="small"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="bg-white rounded-full w-88"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearchClick}
            className="rounded-md bg-teal-700"
          >
            Search
          </Button>
        </div>
        <div
          className="flex items-center justify-center mt-4 text-base font-bold bg-teal-700 h-9 w-40 text-white gap-1 rounded-md cursor-pointer"
          onClick={handleCurrentLocationClick}
        >
          <GpsFixedIcon />
          <p className="text-sm">Current Location</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
