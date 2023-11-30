import {Route, Routes,useNavigate} from 'react-router-dom';
import Redflag from './Redflag.js';
import Navbar from "../pages/Navbar.js";
import Home from '../pages/Home.js';
import SignUp from './SignUp';
import Login from './Login';
import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin.js';
import { useSnackbar } from 'notistack';



function App() {

  const nagivate=useNavigate()

  const [user, setUser] = useState(null);
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    fetch('https://ireporter-backend.onrender.com/session_user', {
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok');
    })
    .then(data => {
      setUser(data);
      console.log(data); 
    })
    .catch(error => {
      console.error('Error fetching session:', error);
    });
}, [user]); 

  function handleLogIn(user){
    setUser(user)
  }

  function handleLogOut(){
    fetch("https://ireporter-backend.onrender.com/logout",{
      method: 'DELETE'
    })
    .then(setUser(null))
    .then(enqueueSnackbar('Logged out successfully', {variant:'success'}))
    .then(nagivate('/'))
  }

  return (
    <div className="App">

      <Routes>

      <Route element={<Navbar handleLogOut={handleLogOut} user={user}/>}>
          <Route element={<Home/>} path="/"/>
          <Route element={<Home/>} path="/home"/>
          <Route path="/redflag" element={<Redflag user={user}/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login handleLogIn={handleLogIn} />} />
          <Route path="/adminLogin" element={<AdminLogin/>}/>

        </Route>
      </Routes>

      
    </div>
  );
}

export default App;
