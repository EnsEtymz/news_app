import React from "react";
import { useState, useEffect } from "react";
import News from "../News";

import Weather from "../Weather";
import RouteNav from "../RouteNav";
import Carousel from "../Carousel";
import Currency from "../Currency";


const Spor =()=>{

  const [haberler, setHaberler] = useState([]);

  useEffect(() => {
    fetch("https://api.collectapi.com/news/getNews?country=tr&tag=sport", {
      headers: {
        "content-type": "content-type",
        "authorization": "apikey 66ULBodlt6lcuLBeMiUaXh:5ijJff3VmVVBRongIx6G0W"
      }
    })
      .then(response => response.json())
      .then(response => setHaberler(response.result));
  }, [])




  return(

    <>
         <div className="container-fluid">
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-2">
            <Weather />
          </div>
          <div className="col-8">
            <RouteNav />
            <Carousel haberler={haberler} />

          </div>
          <div className="col-2">
            <Currency/>
          </div>
        </div>
      </div>
    </div>

  <div className="row row-cols-1 row-cols-md-4 g-4">

    <News haberler={haberler}  />
  </div>
</>

  )
}

export default Spor;