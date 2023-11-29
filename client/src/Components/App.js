import {Route, Routes} from 'react-router-dom';
import Redflag from './Redflag.js';
import Navbar from "../pages/Navbar.js";
import Home from '../pages/Home.js';
import SignUp from './SignUp';
import Login from './Login';
import Landing from './Landing';
import { useState, useEffect } from 'react';


function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('/session')
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
          <Route path="/redflag" element={<Redflag />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

        </Route>
      </Routes>

      
    </div>
  );
}

export default App;
