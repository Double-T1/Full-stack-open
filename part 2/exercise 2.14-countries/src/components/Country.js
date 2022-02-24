import axios from 'axios'
import { useState, useEffect } from 'react'

const Weather = ({country,weather}) => {
    return (
        <div>
            <h2>weather in {country.capital[0]}</h2>     
            <p>temperature: {weather.temp} Celcius</p>
            <img alt='the weather condition' src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}></img>
            <p>wind: {weather.wind} m/s</p>
        </div>
    )
}

const Country = ({country}) => {
    const [weather,setWeather] = useState({
        temp: null,
        wind: null,
        icon: null
    })
    //useEffect will only run after the page is rendered
    useEffect(()=>{
        const params = {
            lat: country.capitalInfo.latlng[0],
            lon: country.capitalInfo.latlng[1],
            appid: process.env.REACT_APP_API_KEY,
            units: 'metric'
        }
        axios.get('https://api.openweathermap.org/data/2.5/weather', {params})
            .then(res => { 
                setWeather({
                    temp: res.data.main.temp,
                    wind: res.data.wind.speed,
                    icon: res.data.weather[0].icon
                })
            })
            .catch(error => console.log(error))
    },[])

    return (
      <>
        <div>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital[0]} </p>
            <p>area: {country.area} </p>
            <h3>languages</h3>
            <ul>
            {Object.values(country.languages).map(ele => <li key={ele}>{ele}</li>)}
            </ul>
            <img src={country.flags.png} alt={`a flag of ${country.name.common}`}></img>
        </div>
        <Weather country={country} weather={weather}/>
      </>
    )
}

export default Country