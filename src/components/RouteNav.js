import React from 'react';
import './still.css'
import { NavLink } from 'react-router-dom';


const RouteNav=()=>{

const showPages=()=>{
document.getElementById('pages').style.display="block";

}
const hidePages=()=>{
    document.getElementById('pages').style.display="none"
}

    return(

<>






<div className='routenav_general'>
<ul>
  <li>
    <NavLink to="/" >Anasayfa</NavLink>
  </li>
  <li>
    <a href="">Bana Özel</a>
  </li>
  <li onMouseOver={()=>showPages()} onMouseOut={()=>hidePages()}>
    <a href="">Sayfalar     ↓</a>
    <ul id='pages'>
      <li>
        <NavLink to="/siyaset" >Siyaset</NavLink>
      </li>
      <li>
        <NavLink to="/spor" >Spor</NavLink>
      </li>
      <li>
        <NavLink to="/teknoloji" >Teknoloji</NavLink>
      </li>
      <li>
        <NavLink to="/bilim" >Bilim</NavLink>
      </li>

    </ul>
  </li>
  <li style={{ float: "right" }}>
    <a href="">English</a>
  </li>
</ul>

</div>


</>
    )
}

export default RouteNav;