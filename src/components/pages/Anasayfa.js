import React from "react";
import '../still.css'
import News from "../News"
import Weather from "../Weather";
import RouteNav from "../RouteNav";
import Carousel from "../Carousel";
import Currency from "../Currency";
import { useState } from "react";

import {  useEffect } from "react";

const Anasayfa =()=>{




const [my_province, setMyProvince] = useState('')
const [isOk, setIsOk] = useState(false);


  if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition (onSuccess, onError);
  } else {
  alert("tarayıcınız konum bilgisi alamıyor...");
  }
  function onSuccess (position) {
  let latitude = position.coords. latitude;
  let longitude= position.coords. longitude;




    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=a8cb3d4976e14e83a00cc09f70090c57`)
      .then(response => response.json())
      .then(response => setMyProvince(response.results[0].components.city))
      .then(console.log('şehir', my_province))
      .then(setIsOk(true))

 
  }
  function onError(error) {
  if(error.code === 1) {
  alert("kullanıcı erişim iznini reddetti.");
  } else if (error.code === 2) {
  alert ("konum alınamadı");
  } else {
  alert("bir hata oluştu");
  }
  }






















  const [haberler, setHaberler] = useState([]);

  useEffect(() => {
    fetch("https://api.collectapi.com/news/getNews?country=tr&tag=general", {
      headers: {
        "content-type": "content-type",
        "authorization": "apikey 4NjpTYLAwUIpIXYgEH5wMF:1OHgANkkKmbG5wapcAGdLJ"
      }
    })
      .then(response => response.json())
      .then(response => setHaberler(response.result));
  }, [])

   

  return (
 
      <>
        
        <div className="container-fluid">
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-2">
            <Weather my_province={my_province} isOk={isOk} />
          </div>
          <div className="col-8">
            <RouteNav />
            <Carousel haberler={haberler}  />
          </div>
          <div className="col-2">
            <Currency/>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid">
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-1">
          </div>
          <div className="col-10">
        <div className="row row-cols-1 row-cols-md-4 g-4">
        <News haberler={haberler}  />
        <News haberler={haberler}  />
      </div>
          </div>
          <div className="col-1">
          </div>
        </div>
      </div>
    </div>
      
 </>


  );
}

export default Anasayfa;