import axios from "axios";
import React from "react";
// import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: "London",
        humidity: 10,
        speed: 2,
        max: 15,
        min: 5,
        feels: 13,
        image: '/Images/clouds.png'
    })
    const [name, setName] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState('');

    const handleClick = () => {
        if(name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=16bfa98849718de13b6e8978b87d47b8&units=metric`; 
            axios.get(apiUrl)
            .then(res => {
                let imagePath = '';
                // eslint-disable-next-line eqeqeq
                if(res.data.weather[0].main == "Clouds") {
                    imagePath = "/Images/clouds.png"
                // eslint-disable-next-line eqeqeq
                } else if(res.data.weather[0].main == "clear") {
                    imagePath = "/Images/clear.png"
                // eslint-disable-next-line eqeqeq
                } else if(res.data.weather[0].main == "Rain") {
                    imagePath = "/Images/rain.png"
                // eslint-disable-next-line eqeqeq
                } else if(res.data.weather[0].main == "Drizzle") {
                    imagePath = "/Images/drizzle.png"
                // eslint-disable-next-line eqeqeq
                } else if(res.data.weather[0].main == "Mist") {
                    imagePath = "/Images/mist.png"
                } else {
                    imagePath = "/Images/clouds.png"
                }
                console.log(res.data);
                setData({...data, celcius: res.data.main.temp, name: res.data.name, 
                    humidity: res.data.main.humidity, speed: res.data.wind.speed, max: res.data.main.temp_max, 
                    min: res.data.main.temp_min, feels: res.data.main.feels_like, image: imagePath})
                    setError('');
            })
            .catch( err => {
               // eslint-disable-next-line eqeqeq
               if(err.response.status == 404) {
                    window.alert("Invalid City Name")
               } else {
                    setError('');
               }
               console.log(err)
            }); 
        }
    }

    return (
        <div className="container">
            <div className="weather">
                <div className="search">
                    <input type="text" placeholder="Enter City Name"  onChange={e => setName(e.target.value)}/>
                    <button><img src="/Images/search.png" onClick={handleClick} alt="" /></button>
                </div>
                <div className="winfo">
                    <img src={data.image} alt="" className="icon"/>
                    <h1>{Math.round(data.celcius)}℃</h1>
                    <h2>{data.name}</h2>
                    <div className="col">
                        <div className="max-min">
                            <p>Max: {Math.round(data.max)} ℃</p>
                            <p>Min: {Math.round(data.min)} ℃</p>
                        </div>
                        <h4>Feels Like: {Math.round(data.feels)} ℃</h4>
                    </div>
                    <div className="details">
                        <div className="col">
                            <img src="/Images/humidity.png" alt="" ></img>
                            <div className="unit">
                                <p>{Math.round(data.humidity)}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className="col">
                        <img src="/Images/wind.png" alt="" ></img>
                            <div className="unit">
                                <p>{Math.round(data.speed)} km/h</p>
                                <p>Wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home