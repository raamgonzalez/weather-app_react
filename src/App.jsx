import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import Spinner from './Spinner';


const API_KEY = '6ce99c2e52be65aa40de618bb02677c8';
const API_URL = 'https://api.openweathermap.org/data/2.5/';


const dateBuilder = () => {
  const d = new Date();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
};


const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const searchingWeather = (query) => {
    setIsLoading(true);
    fetch(`${API_URL}weather?q=${query}&units=metric&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    searchingWeather('Buenos Aires');
  }, []);

  const onSubmitSearch = (event) => {
    event.preventDefault();
    searchingWeather(query);
  };

  return (
      <div id='app' className='flex flex-col h-screen text-slate-700 font-serif'>
        <header className='flex justify-center items-center w-full h-20 text-5xl mt-10 italic'>
            <h1>Weather App</h1>
        </header>
        <form
          onSubmit={onSubmitSearch}
          className='search-box flex justify-center items-center w-full max-w-[900px] mt-5 mx-auto px-5 drop-shadow-md shadow-gray-800'
          >
          <input
            type='text'
            className='search-bar rounded-md text-slate-black py-3 px-5 w-full bg-slate-100 focus:bg-white'
            placeholder='Buenos Aires, London, Tokyo...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        {isLoading ? (
              <Spinner/>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              <main className='flex flex-col gap-5 justify-center mt-20 p-15  sm:flex sm:flex-row sm:gap-20'>
                <section className='w-fit weather-wrap p-5 flex flex-col gap-5 place-items-left text-left w-[500px] text-4xl'>
                    <>
                      <div className='location-box'>
                        <p className='location text-5xl'>
                          {weather.name}, {weather.sys.country}
                        </p>
                        <p className='date italic'>{dateBuilder()}</p>
                      </div>
                      <div className='weather-box mt-7'>
                        <p className='temp text-8xl drop-shadow-md'>
                          {Math.round(weather.main.temp)}°C
                        </p>
                        <p className='weather text-5xl mt-5'>{weather.weather[0].main}</p>
                      </div>
                    </>
                </section>
                <section className='w-fit weather-wrap p-5 flex flex-col gap-5 place-items-left text-left w-[500px] text-4xl sm:p-0 sm:px-5'>
                      <section className='mt-7 flex flex-col gap-3'>
                        <p className='temp text-3xl font-bold'>
                          <span className='text-4xl font-light'>Humidity:</span> {weather.main.humidity}%
                        </p>
                        <p className='temp text-3xl font-bold'>
                          <span className='text-4xl font-light'>Pressure:</span> {weather.main.pressure} Pa
                        </p>
                        <p className='temp text-3xl font-bold'>
                          <span className='text-4xl font-light'>Feels like:</span> {weather.main.feels_like}°C
                        </p>
                        <p className='temp text-3xl font-bold'>
                          <span className='text-4xl font-light'>Wind speed:</span> {weather.wind.speed} m/s
                        </p>
                        <p className='temp text-3xl font-bold'>
                          <span className='text-4xl font-light'>Longitude:</span> {weather.coord.lon}
                        </p>
                        <p className='temp text-3xl font-bold'>
                          <span className='text-4xl font-light'>Latitude:</span> {weather.coord.lat}
                        </p>
                      </section>
                </section>
              </main>
        )}
      </div>
  );
};

export default App;