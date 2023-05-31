import React, { useEffect, useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState('chopan');
  const api_key = '7d92e3e183a61af44700f4c73a598539';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${api_key}`;

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCity(data))
      .catch((error) => console.log(error));
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <input
            type="search"
            className="inputField form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
          {city ? (
            <div className="info">
              <h2>
                <i className="fa-solid fa-street-view"></i>
                {city.name}
              </h2>
              {city.main && city.main.temp ? (
                <>
                  <h1>
                 Temp :   {city.main.temp} °C <br />
                 visibility:  {city.visibility} <br />
                    {city.weather[0].icon}
                  </h1>
                  <h2>
                    min: {city.main.temp_min} °C | max: {city.main.temp_max} °C |
                    pressure: {city.main.pressure}
                  </h2>
                </>
              ) : (
                <p>No Data Found</p>
              )}
            </div>
          ) : (
            <p>No Data Found</p>
          )}
        </div>
        <div className="col-sm-3"></div>
      </div>
    </div>
  );
}
