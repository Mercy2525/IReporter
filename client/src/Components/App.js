import {Route, Routes} from 'react-router-dom';
import Redflag from './Redflag.js';
import Navbar from "../pages/Navbar.js";
import Home from '../pages/Home.js';
import SignUp from './SignUp';
import Login from './Login';
import Dashboard from '../Dashboard/Dashboard.js';
import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin.js';
import Users from '../Dashboard/Users.js';
import Redflags from '../Dashboard/Redflag.js';
import Interventions from '../Dashboard/Intervention.js';
import UserIntervention from './UserIntervention.js'
import NotFound from '../pages/NotFound.js'
import Landing from './Landing.js';


function App() {

  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});
  const[refresh, setRefresh]=useState(false)
 
  //user-session
  useEffect(() => {
    fetch("/session_user")
    .then(response=>{
      if (response.ok){
        return response.json()
      }
    })
    .then(data=>setUser(data))
    .catch(error => console.log(error));
  }, [refresh]); 



  //admin session
  useEffect(() => {
    fetch("/session_admin")
    .then(response=>{
      if (response.ok){
        return response.json()
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
            <Route path='/user/redflags' element={<Landing user={user} refresh={refresh} setRefresh={setRefresh}/>}/>
            <Route path='/user/intervention' element={<UserIntervention user={user} refresh={refresh} setRefresh={setRefresh}/>}/>
        </Route>
            <Route path='*' element={<NotFound/>}/>
            <Route path="/admin/dashboard" element={<Dashboard/>}/>
            <Route path="/admin/users" element={<Users admin={admin}/>}/>
            <Route path="/admin/redflags" element={<Redflags admin={admin}/>}/>
            <Route path="/admin/interventions" element={<Interventions admin={admin}/>}/>
      </Routes>
    </div>
  );
}
export default App;
