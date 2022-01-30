import React, {useState} from 'react';

const api = {
  key: "68af8cae3729a9cdb52b65f0d07f732a",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
      setQuery("")
    });
    }
  }

  const dateBuilder = (day) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let monthDay = days[day.getDay()];
    let date = day.getDate()
    let month = months[day.getMonth()]
    let year = day.getFullYear()

    return `${monthDay}, ${date} ${month}, ${year}`
  }

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }


  return (
    <div className={(typeof weather.main !== "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
    <main>
      <div className='search-box'>
        <input
        type="text"
        className='search-bar'
        placeholder='Search...'
        onChange={handleQueryChange}
        // onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
        />
      </div>
      {(typeof weather.main !== "undefined") ? (
        <div>
      <div className='location-box'>
      <div className='location'>{weather.name}, {weather.sys.country}</div>
      <div className='date'>{dateBuilder(new Date())}</div>
      </div>
      <div className='weather-box'>
        <div className='temp'>
          {Math.round(weather.main.temp)}°c
        </div>
        <div className='weather'>{weather.weather[0].main}</div>
      </div>
      </div>
      ) : ('')}
    </main>
    </div>
  );
}

export default App;