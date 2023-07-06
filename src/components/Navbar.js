import React from 'react'
import './still.css'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './config/firebase';
import {logout as logoutHandle} from './pages/store/auth';
import { useNavigate } from 'react-router-dom';


const Navbar = () =>{

    const navigate = useNavigate();
const dispatch = useDispatch()
const {user} = useSelector(state => state.auth )

const handleLogout =async()=>{
await logout();
dispatch(logoutHandle())
navigate('/login',{
    replace: true
})
}



    return(
 <div className='navbar_general'>
    <NavLink to="/">
<img src='https://s.hbrcdn.com/static/img/tasarim/haberler-logo.svg' className='navbar_img'></img>
</NavLink>

{


}


<NavLink to={user ? '/profile' : 'login'}>
    <img className='profile_img' src={user.photoURL || 'https://pbs.twimg.com/media/C7iOFxmXgAIOJvO.jpg'}></img>
</NavLink>

{user? 
    <>
        <span style={{color:"white"}} >Hoşgeldin {user.displayName}</span>
        <button onClick={handleLogout} className='navbar_button' >  Çıkış yap</button>
        </>
:
<NavLink to="/login" >
    <button className='navbar_button'> Üye Girişi</button>
   </NavLink>
}



 </div>
    )
};

export default Navbar;