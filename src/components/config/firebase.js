import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword , signOut, updateProfile , onAuthStateChanged, sendPasswordResetEmail} from "firebase/auth"
import { toast } from "react-hot-toast";
import store from '../pages/store'
import { login as loginHandle, logout as logoutHandle } from "../pages/store/auth";
import {getFirestore} from 'firebase/firestore'







const firebaseConfig = {
    apiKey: "AIzaSyBwENoDHKjI_CfyWkGclCChPi84hqVYODY",
    authDomain: "news-auth-91e92.firebaseapp.com",
    projectId: "news-auth-91e92",
    storageBucket: "news-auth-91e92.appspot.com",
    messagingSenderId: "449082405446",
    appId: "1:449082405446:web:b15c060e63cef106d0d047",
    measurementId: "G-1F4MLEHHZY"
  };

  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
 export const auth = getAuth();
 export const db = getFirestore(app);


export const update = async data =>{
try{ 
await updateProfile(auth.currentUser,data);
toast.success('Profil Başarıyla Güncellendi.')
return true

}
catch(error){
  toast.error(error.message);
} 
}



export const login = async (email, password) =>{
try{
const {user} = await signInWithEmailAndPassword(auth, email, password)
return { user }; 
}
catch(error){
toast.error(error.message);
}
}


export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    return { user }; 
  } catch (error) {
    toast.error(error.message);
  }
};


  export const logout = async() =>{
    try{ 
await signOut(auth);
return true
  }
  catch(error){
  toast.error(error.message)
  }
}


onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(loginHandle(user))
    console.log(user.uid);

  
  } else {
    store.dispatch(logoutHandle())
    
  }
});

export const sendreset = async (email) =>{
  await sendPasswordResetEmail(auth, email)
  .then(() => {
  toast.success('Parola sıfırlama maili e-posta adresinize gönderildi.')
  })
  .catch((error) => {
   toast.error(error.message)

  });
}
 