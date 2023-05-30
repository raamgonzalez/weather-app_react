import { useEffect, useState } from 'react'
import './App.css'
// import { useCallback } from 'react'
// import debounce from 'just-debounce-it'

const API_KEY = '6ce99c2e52be65aa40de618bb02677c8'
const API_URL =  'https://api.openweathermap.org/data/2.5/'

export default function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})



  // const fetchWeather = (e) => {
  //   if (e.key === 'Enter') {
  //     fetch(`${API_URL}weather?q=${query}&units=metric&appid=${API_KEY}`)
  //     .then (res => res.json())
  //     .then (data => {
  //       return setWeather(data)
  //     })
  //   }
  // }



  function dateBuilder () {
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }

  // const handleChange = (event) => {
  //   const newSearch = event.target.value
  //   updateSearch(newSearch)
  // }
  const searchingWeather = (query) => {
    fetch(`${API_URL}weather?q=${query}&units=metric&appid=${API_KEY}`)
    .then (res => res.json())
    .then (data => {
      return setWeather(data)
    })
  }
  

  useEffect(() => {
    searchingWeather('Buenos Aires')
  }, [])


  const onSubmitSearch = (event) => {
    event.preventDefault()
    searchingWeather(query)
  }





  return (
    <>
      <div id='app' className="flex flex-col h-screen text-slate-700 font-serif">
        <form onSubmit={onSubmitSearch} className="search-box flex justify-center items-center w-full max-w-[900px] mt-10 mx-auto px-5 drop-shadow-md shadow-gray-800 ">
          <input
          type="text" 
          className="search-bar rounded-md text-slate-black py-3 px-5 w-full bg-slate-100 focus:bg-white" 
          placeholder="Buenos Aires, London, Tokyo..."
          onChange={e => setQuery(e.target.value)}
          />
        </form>
        <main className="flex gap-20 justify-center mt-20">
            <section className="w-fit weather-wrap  p-5 flex flex-col gap-5 place-items-left text-left w-[500px] text-4xl">
              <div className="location-box ">
                <div className="location text-5xl">{ weather.name }, {weather.sys.country}</div>
                <div className="date italic">{ dateBuilder() }</div>
              </div>
              <div className="weather-box mt-7">
                <p className="temp text-8xl drop-shadow-md">{ Math.round(weather.main.temp)}°C</p>
                <p className="weather text-5xl mt-5">{ weather.weather[0].main }</p>
              </div>
            </section>
            <section>
              <section className="mt-7">
                <p className="temp text-5xl">{ weather.weather[0].main }</p>
                <p className="temp text-4xl">{ weather.weather[0].description }</p>
                <p className="temp text-4xl">Humidity: { weather.main.humidity }%</p>
                <p className="temp text-4xl">Pressure: { weather.main.pressure }</p>
                <p className="temp text-4xl">Feels like: { weather.main.feels_like }°C</p>
                <p className="temp text-4xl">Wind speed: { weather.wind.speed }</p>
                <p className="temp text-4xl">Longitude: { weather.coord.lon }</p>
                <p className="temp text-4xl">Latitude: { weather.coord.lat }</p>
              </section>
          </section>
        </main>
      </div>
    </>
  )
}
