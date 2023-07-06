import React from "react";
import './still.css'
import Table_News from "./Table_News";

const Carousel = (props) => {
  const haberler = props.haberler;

  return (
    <div style={{ display: "flex" }}>
      <div 
        id="carouselExampleCaptions"
        className="carousel slide"
        style={{ width: "70%"  }}
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-indicators">
          {haberler.map((haber, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="carousel-inner">
          {haberler.map((haber, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={haber.image}
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption">
                <h3>{haber.name}</h3>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="table">
        <Table_News />
      </div>
    </div>
  );
};

export default Carousel;
