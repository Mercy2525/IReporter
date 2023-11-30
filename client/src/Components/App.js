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
    fetch("http://127.0.0.1:5555/session_user")
    .then(response=>{
      if (response.ok){
        response.json()
        .then(data=>setUser(data))
        .then(console.log(user))
      }
    })
  }, [user]);

  function handleLogIn(user){
    setUser(user)
  }

  function handleLogOut(){
    fetch("http://127.0.0.1:5555/logout",{
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
          <Route path="/redflag" element={<Redflag />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login handleLogIn={handleLogIn} />} />
          <Route path="/adminLogin" element={<AdminLogin/>}/>

        </Route>
      </Routes>

      
    </div>
  );
}

export default App;
