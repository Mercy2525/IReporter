import {Route, Routes} from 'react-router-dom';
import Redflag from './Redflag.js';
import Navbar from "../pages/Navbar.js";
import Home from '../pages/Home.js';


function App() {
  return (
    <div className="App">

      <Routes>

        <Route element={<Navbar/>}>
          <Route element={<Home/>} path="/"/>
          <Route element={<Home/>} path="/home"/>
          <Route path="/redflag" element={<Redflag />} />

        </Route>
      </Routes>

      
    </div>
  );
}

export default App;
