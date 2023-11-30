import {Route, Routes} from 'react-router-dom';
import Redflag from './Redflag.js';
import Navbar from "../pages/Navbar.js";
import Home from '../pages/Home.js';
import SignUp from './SignUp';
import Login from './Login';
import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin.js';


function App() {
  //
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('https://ireporter-backend.onrender.com/session_user')
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error('Error fetching session:', error));
  }, []);


  return (
    <div className="App">

      <Routes>

        <Route element={<Navbar user={user}/>}>
          <Route element={<Home/>} path="/"/>
          <Route element={<Home/>} path="/home"/>
          <Route path="/redflag" element={<Redflag user={user}/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminLogin" element={<AdminLogin/>}/>

        </Route>
      </Routes>

      
    </div>
  );
}

export default App;
