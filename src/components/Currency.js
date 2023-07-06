import React from "react";
import './still.css'
import { useState, useEffect } from "react";

const Currency =()=>{

    const [dovizler, setDoviz] = useState([]);

    useEffect(() => {
      fetch("https://api.collectapi.com/economy/allCurrency", {
        headers: {
          "content-type": "content-type",
          "authorization": "apikey 4NjpTYLAwUIpIXYgEH5wMF:1OHgANkkKmbG5wapcAGdLJ"
        }
      })
        .then(response => response.json())
        .then(response => setDoviz(response.result));
    }, [])

    return(
        <div className="currency_general">
            {dovizler.map((doviz) => (
                <div className="currency_status" key={doviz.code}>
                    <div className="currency_status_l">{doviz.code}</div>
                    <div className="currency_status_r">{doviz.sellingstr} ₺</div>
                </div>
            ))}
        </div>
    )
};

export default Currency;
