import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, } from "firebase/firestore";
import { db } from "../config/firebase";
import { useSelector } from "react-redux"; // Yeni eklenen kısım
import { useEffect } from "react";

const Kaynak = () => {
  const [selectedNames, setSelectedNames] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      selected: selectedNames,
    }));
  }, [selectedNames]);




  const toggleAdd = (name) => {
    if (selectedNames.includes(name)) {
      setSelectedNames((prevSelectedNames) =>
        prevSelectedNames.filter((selectedName) => selectedName !== name)
      );
    } else {
      setSelectedNames((prevSelectedNames) => [...prevSelectedNames, name]);
    }
  };

  

const [kaynaklar] = useState([

    {
      id:1,
      image:"https://www.turkmedya.com.tr/assets/img/logo/logo_aksam.png",
      name:"Akşam",
      isAdd:false
    },

    {
        id:2,
        image:"https://www.cumhuriyet.com.tr/Archive/2019/6/12/1435511_cover.jpeg",
        name:"Cumhuriyet",
        isAdd:false  
      },

      {
        id:3,
        image:"https://www.marketingturkiye.com.tr/wp-content/uploads/2018/07/haberturk.jpg",
        name:"Habertürk",
        isAdd:false  
      },

      {
        id:4,
        image:"https://s3-symbol-logo.tradingview.com/hurriyet--600.png",
        name:"Hürriyet",
        isAdd:false  
      },

      {
        id:5,
        image:"https://i2.milimaj.com/i/milliyet/75/869x477/5ca1ce2045d2a029641cc458.jpg",
        name:"Milliyet",
        isAdd:false  
      },

      {
        id:6,
        image:"https://images.migrosone.com/sanalmarket/product/37990020/37990020-c6e325-1650x1650.jpg",
        name:"Posta",
        isAdd:false  
      },

      {
        id:7,
        image:"https://files.sikayetvar.com/lg/cmp/32/32.svg?1522650125",
        name:"Sabah",
        isAdd:false  
      },

      {
        id:8,
        image:"https://static.birgun.net/resim/haber-detay-resim/2020/12/29/sozcu-rtuk-e-isyan-etti-10-aydir-ne-bekliyorsunuz-822391-5.jpg",
        name:"Sözcü",
        isAdd:false  
      },

      {
        id:9,
        image:"https://images.migrosone.com/sanalmarket/product/37500020/takvim-gazetesi-cb904a-1650x1650.jpg",
        name:"Takvim",
        isAdd:false  
      },

      {
        id:10,
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzDfggR_rxp3EOeYlqCpFy4UdP9Xbumf02rg&usqp=CAU",
        name:"Yeni Akit",
        isAdd:false  
      },

      {
        id:11,
        image:"https://images.migrosone.com/sanalmarket/product/37991005/37991005-278f91-1650x1650.jpg",
        name:"Yeni Şafak",
        isAdd:false  
      },

      {
        id:12,
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYlGIr-_atHmIREgs8vXSbHceL1NlyvZlaNw&usqp=CAU",
        name:"Ortadoğu",
        isAdd:false  
      }
    
])


const handleKaynak = async () => {
  if (user) {
    const ref = doc(db, "users", user.uid);
    setDoc(ref, {
      selected: selectedNames,
    });

    console.log(user.uid);
    navigate("/", {
      replace: true,
    });

    const updatedDocSnap = await getDoc(ref);
    if (updatedDocSnap.exists()) {
      setUserData(updatedDocSnap.data().selected);
      console.log('usdata', userData)
    }
  }
};

  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {kaynaklar.map((kaynak) => (
          <div className="col" key={kaynak.id}>
            <div
              className="card"
              style={{ boxShadow: "0 15px 15px rgba(0, 0, 0, 0.6)" }}
            >
              <img
                src={kaynak.image}
                className="card-img-top"
                style={{ maxHeight: "120px" }}
                alt={kaynak.name}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ display: "inline-block" }}>
                  {kaynak.name}
                </h5>

                <button
                  className={selectedNames.includes(kaynak.name) ? "btn btn-danger" : "btn btn-primary"}
                  onClick={() => toggleAdd(kaynak.name)}
                  style={{ float: "right" }}
                >
                  {selectedNames.includes(kaynak.name) ? "Kaldır" : "Ekle"}
                </button>
              </div>
            </div>
          </div>
        ))}
        <NavLink
          to="/"
          className="btn btn-danger"
          style={{ width: "100%", margin: "20px 0" }}
          onClick={handleKaynak}
        >
          Tercihlerimi Onayla
        </NavLink>
      </div>
      <div>
    
        <p>Seçili kaynaklar:</p>
        <ul>
          {selectedNames.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Kaynak;