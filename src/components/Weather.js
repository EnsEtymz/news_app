import './still.css';

import React, { useState, useEffect } from "react";


const Weather = (props) => {
  const [havadurumu, setHavadurumu] = useState();
  const province = props.my_province;

  useEffect(() => {
    if (province) {
    fetch(`https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=${province}`, {
    headers: {
    "content-type": "content-type",
    "authorization": "apikey 66ULBodlt6lcuLBeMiUaXh:5ijJff3VmVVBRongIx6G0W"
    }
    })
    .then(response => response.json())
    .then(response => {
    setHavadurumu(response.result);
    });
    }
    }, [province]);

  function formatTemperature(str) {
    if (str.length < 2) {
      return str + "C°";
    } else {
      const firstTwoChars = str.substring(0, 2);
      return firstTwoChars + "C°";
    }
  }

  return (
    <>
      {havadurumu ? (
        <div className="weather_general">
          <div className="weather_img">🔆</div>
          <div className="weather_status">Güneşli</div>
          <div className="weather_location"><b>Gaziantep</b></div>
          <div className="weather_degree">{formatTemperature(havadurumu[0].degree)}</div>
          <div className="weather_next_general">
            {havadurumu.map((hava, index) => (
              <div className="weather_next" key={index}>
                <b><p className="l">{hava.date}</p></b>
                <b><p className="r">🔆 {formatTemperature(hava.degree)}</p></b>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="weather_general">
          <div className="weather_img">🔆</div>
          <div className="weather_status">??</div>
          <div className="weather_location"><b>??</b></div>
          <div className="weather_degree"></div>
          <div className="weather_next_general">
       
          </div>
        </div>
      )}
    </>
  );
};

export default Weather;
