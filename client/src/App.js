import {Route, Routes} from 'react-router-dom';
import Redflag from './Components/Redflag.js';
import Navbar from "./Components/Navbar.js";
import Home from '../Components/Home.js';


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
