import React, { useState, useEffect } from "react";
import "./still.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import { useSelector } from "react-redux";

const News = (props) => {
  const haberler = props.haberler;
  const user = useSelector((state) => state.auth.user);

  const [selectedHaber, setSelectedHaber] = useState([]);

  useEffect(() => {
    if (user) {
      const ref = doc(db, "news", user.uid);
      setDoc(ref, {
        selectedhbr: selectedHaber,
      });
    }
  }, [selectedHaber, user]);

  const Card = ({ haber }) => {
    const isHaberSelected = selectedHaber.some((item) => item.url === haber.url);

    const handleMouseClick = () => {
      if (!isHaberSelected) {
        const haberData = {
          name: haber.name,
          image: haber.image,
          url: haber.url,
        };

        setSelectedHaber((prevHaberler) => [...prevHaberler, haberData]);
      }
    };

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const divStyle = {
      transition: "transform 0.5s",
      transform: isHovered ? "scale(1.1)" : "scale(1)",
      width: "18rem",
      margin: "15px auto",
      boxShadow: "0 15px 15px rgba(0, 0, 0, 0.6)",
    };
    return (
      <div className="col">
        <div
          className="card h-100"
          style={divStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          key={haber.key}
        >
          <a href={haber.url}>
            <img
              src={haber.image}
              style={{ maxHeight: "162.8px" }}
              className="card-img-top"
              alt="..."
            />
          </a>
          <div className="card-body">
            <h5 className="card-title">{haber.name}</h5>
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
                borderColor: selectedHaber.some(
                  (item) => item.url === haber.url
                )
                  ? "orange"
                  : "black",
                color: selectedHaber.some((item) => item.url === haber.url)
                  ? "orange"
                  : "black",
              }}
              onClick={handleMouseClick}
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
              {haber.source}
            </b>
          </div>
        </div>
      </div>
    );
  };

  return <>{haberler.map((haber) => <Card key={haber.key} haber={haber} />)}</>;
};

export default News;
