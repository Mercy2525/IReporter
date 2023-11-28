import Home from "./components/Home";
import Landing from "./components/Landing";
import { Route,Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">

      <Routes>

        <Route element={<Landing/>}>
          <Route element={<Home/>} path="/"/>
          <Route element={<Home/>} path="/home"/>
          

        </Route>

        


      </Routes>

      
    </div>
  );
}

export default App;
