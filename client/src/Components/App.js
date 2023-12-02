import {Route, Routes} from 'react-router-dom';
import Redflag from './Redflag.js';
import Navbar from "../pages/Navbar.js";
import Home from '../pages/Home.js';
import SignUp from './SignUp';
import Login from './Login';
import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin.js';

import NotFound from '../pages/NotFound.js'
import Landing from './Landing.js';



function App() {

  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});
  // const[isLoggedIn, setIsLoggedIn]=useState(false)
 
  //user-session
  useEffect(() => {
    fetch("https://ireporter-backend.onrender.com/session_user")
    .then(response=>{
      if (response.ok){
        response.json()
      }
    })
    .then(data=>setUser(data))
    .catch(error => console.log(error));
  }, []); 

  //admin session
  useEffect(() => {
    fetch("https://ireporter-backend.onrender.com/session_admin")
    .then(response=>{
      if (response.ok){
        response.json()
      }
    })
    .then(data=>setAdmin(data))
    .catch(error => console.log(error));
  }, []);



  return (
    <div className="App">

      <Routes>

      <Route element={<Navbar admin={admin} setAdmin={setAdmin} setUser={setUser} user={user}/>}>
          <Route element={<Home/>} path="/"/>
          <Route element={<Home/>} path="/home"/>
          <Route path="/redflag" element={<Redflag user={user}/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setUser={setUser}  />} />
          <Route path="/adminLogin" element={<AdminLogin setAdmin={setAdmin}/>}/>
          <Route path='/landing' element={<Landing user={user}/>}/>
        </Route>

        <Route path='*' element={<NotFound/>}/>

      </Routes>

      
    </div>
  );
}

export default App;
