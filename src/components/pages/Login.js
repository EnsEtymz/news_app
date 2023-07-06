import React, { useState } from "react";
import './login.css';
import { NavLink } from "react-router-dom";
import { login, register, sendreset,auth} from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useDispatch } from "react-redux";
import { updateProfile } from "firebase/auth";

const Login = () => {
  const [isLogin, setLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dsplyName, setdsplyName] = useState(""); // New state for display name

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleUp = async () => {
    const { user } = await register(email, password);
    if (user) {
      console.log(user.uid);
  
      await setDoc(doc(db, "users", user.uid), {
        createdAt: Timestamp.now(),
      });
  
      await updateProfile(auth.currentUser, { displayName: dsplyName }); // Display adını güncelle
  
      navigate('/kaynak', { replace: true });
      return user;
    }
    dispatch(login(auth.currentUser));
  };

  const handleIn = async () => {
    const { user } = await login(email, password);
    navigate('/', { replace: true });
  };

  const handleReset = async () => {
    await sendreset(email);
  };

  return (
    <div className="bg">
      <div className="login-container">
        <form action="" className="form-login">
          <ul className="login-nav">
            <li className={`login-nav__item ${isSignUp ? "" : "active"}`}>
              <a href="#" onClick={handleSignInClick}>
                Giriş Yap
              </a>
            </li>
            <li className={`login-nav__item ${isSignUp ? "active" : ""}`}>
              <a href="#" onClick={handleSignUpClick}>
                Kayıt Ol
              </a>
            </li>
          </ul>
          <label htmlFor="login-input-user" className="login__label">
            E-Posta
          </label>
          <input
            id="login-input-user"
            className="login__input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {isSignUp && ( // Render display name input only during sign up
            <>
              <label htmlFor="login-input-display" className="login__label">
              Kullanıcı Adı
              </label>
              <input
                id="login-input-display"
                className="login__input"
                type="text"
                value={dsplyName}
                onChange={(e) => setdsplyName(e.target.value)}
              />
            </>
          )}

          <label htmlFor="login-input-password" className="login__label">
            Şifre
          </label>
          <input
            id="login-input-password"
            className="login__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="login-sign-up" className="login_label--checkbox">
            <input
              id="login-sign-up"
              type="checkbox"
              className="login__input--checkbox"
            />{" "}
            Keep me Signed İn
          </label>
   
        <NavLink 
         className="login__submit" 
         type="submit"
         onClick={isSignUp ? handleUp : handleIn}
         
         >
          {isSignUp ? "Kayıt Ol" : "Giriş Yap"}
        </NavLink>
    
     
  <span href="#" className="login__forgot" onClick={handleReset}>
        Forgot Password?
      </span>
    
        
      </form>
    
    </div></div>



);

};


export default Login;
