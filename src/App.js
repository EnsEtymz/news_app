import './App.css';
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast';


import {Route, Routes } from 'react-router-dom';
import Siyaset from './components/pages/Siyaset';
import Spor from './components/pages/Spor';
import Anasayfa from './components/pages/Anasayfa';
import Teknoloji from './components/pages/Teknoloji';
import Login from './components/pages/Login';
import Nopage from './components/pages/Nopage';
import Kaynak from './components/pages/Kaynak';
import Profile from './components/pages/Profile';

import Bilim from './components/pages/Bilim';






function App() {


  

  return (
    <>
    
    <Toaster position="top-right"/>
        <Navbar />

      


       
        <Routes>
        <Route path='/' element={<Anasayfa/>} />
        <Route path='/spor' element={<Spor/>} />
        <Route path='/siyaset' element={<Siyaset/>} />
        <Route path='/teknoloji' element={<Teknoloji/>} />
        <Route path='/bilim' element={<Bilim/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/nopage' element={<Nopage/>} />
        <Route path='/kaynak' element={<Kaynak/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>


  

    </>
  
  );
}

export default App;