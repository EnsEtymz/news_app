import React from "react";
import { useState,useEffect } from "react";
import News from "../News";
import { update , auth} from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/auth";
import './profile.css'

const Profile =()=>{

    const [haberler, setHaberler] = useState([]);

    useEffect(() => {
      fetch("https://api.collectapi.com/news/getNews?country=tr&tag=general", {
        headers: {
          "content-type": "content-type",
          "authorization": "apikey 66ULBodlt6lcuLBeMiUaXh:5ijJff3VmVVBRongIx6G0W"
        }
      })
        .then(response => response.json())
        .then(response => setHaberler(response.result));
    }, [])



const [avatar, setAvatar] = useState('');

const dispatch = useDispatch()
const { user } = useSelector(state => state.auth);


const handleUpdate = async () =>{
  await update({

    photoURL:avatar
  })
  dispatch(login(auth.currentUser))
}


    return(
<>
<div>
    <div className="pp_l">
    <img className="pp_img" src={user.photoURL || 'https://pbs.twimg.com/media/C7iOFxmXgAIOJvO.jpg'}></img>
    </div>

    <div className="pp_r">
    
    
  <>
  <div className="mb-3 row">
    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
      Email
    </label>
    <div className="col-sm-10">
      <span>{user.email}</span>
    </div>
  </div>
  <div className="mb-3 row">
    <label className="col-sm-2 col-form-label">
      Kullanıcı Adı
    </label>
    <div className="col-sm-10">
      <span>{user.displayName}</span>
    </div>
  </div>



</>













<>
 
  <div className="mb-3 row">
    <label  className="col-sm-2 col-form-label">
      Foto
    </label>
    <div className="col-sm-10">
      <input className="form-control" id="inputPassword" value={avatar} onChange={e => setAvatar(e.target.value)} placeholder="Eklemek istediğiniz fotoğrafın url adresini girin." />
    </div>
  </div>
  <button type="button" className="btn btn-primary" onClick={handleUpdate}>
  Güncelle
</button>


</>

    


    </div>
</div>



<div className="row row-cols-1 row-cols-md-4 g-4" style={{border:"1px solid black"}}>
<div className="pp_bottom"><b>Kaydedilen Haberler</b></div>
<News haberler={haberler}  />
</div>  



</>
    )
}

export default Profile;

//https://pbs.twimg.com/media/C7iOFxmXgAIOJvO.jpg