import React from "react";
import { useState, useEffect } from "react";
import Weather from "../Weather";
import RouteNav from "../RouteNav";
import Carousel from "../Carousel";
import Currency from "../Currency";

const Bilim = () =>{


    const [haberler, setHaberler] = useState([]);

    useEffect(() => {
      fetch("https://api.collectapi.com/news/getNews?country=tr&tag=general", {
        headers: {
          "content-type": "content-type",
          "authorization": "apikey 45kppKdoohMzdv9lnAdohW:44rHil2VCkLFroFZaNe868"
        }
      })
        .then(response => response.json())
        .then(response => setHaberler(response.result));
    }, [])
  
  
  
  
  
  
  
  
  
  
  
    const [hoveredIndex, setHoveredIndex] = useState(-1);
  
    const handleMouseEnter = (index) => {
      setHoveredIndex(index);
    };
  
    const handleMouseLeave = () => {
      setHoveredIndex(-1);
    };
  
    const [magazinler, setmagazinler] = useState([]);
  
    useEffect(() => {
      fetch(
        "https://newsapi.org/v2/top-headlines?country=tr&category=science&apiKey=8d2843a042b24772a023bc93ef30aef4"
      )
        .then((response) => response.json())
        .then((data) => setmagazinler(data.articles))
        .catch((error) => console.error("Hata:", error));
    }, []);







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
              <Carousel haberler={haberler}  />
    
            </div>
            <div className="col-2">
              <Currency/>
            </div>
          </div>
        </div>
      </div>
    
    
    
    
    
    
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {magazinler.map((magazin, index) => (
            <div className="col" key={index}>
              <div
                className="card h-100"
                style={{
                  transition: "transform 0.5s",
                  transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                  width: "18rem",
                  margin: "15px auto",
                  boxShadow: "0 15px 15px rgba(0, 0, 0, 0.6)",
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <a href={magazin.url}>
                  <img
                    src="https://scontent.fgzt2-1.fna.fbcdn.net/v/t39.30808-6/341704374_772579660967263_389534715227834504_n.png?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=o1qpnWTlKxUAX9ZKi2N&_nc_ht=scontent.fgzt2-1.fna&oh=00_AfA5HPuD3Im3I3avO5pYKKN4kSleLVAEp1ETyHcK2d4iQA&oe=64987D69"
                    style={{ maxHeight: "162.8px" }}
                    className="card-img-top"
                    alt="..."
                  />
                </a>
                <div className="card-body">
                  <h5 className="card-title">{magazin.title}</h5>
                  <button
                    id="kayit_button"
                    style={{
                      height: "30px",
                      width: "30px",
                      position: "absolute",
                      bottom: "1px",
                      left: "5px",
                      borderRadius: "15px 15px",
                      background: "white",
                    }}
                  >
                    ♥
                  </button>
                  <b
                    style={{
                      position: "absolute",
                      bottom: "0px",
                      right: "15px",
                      color: "red",
                      display: "inline-block",
                    }}
                  >
                    {magazin.author}
                  </b>
                </div>
              </div>
            </div>
          ))}
        </div></>
    )
}

export default Bilim;