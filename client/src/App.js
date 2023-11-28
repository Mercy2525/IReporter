import './App.css';
import {BrowserRouter, Route ,Routes} from 'react-router-dom';
import Redflag from './Components/Redflag.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/redflag" element={<Redflag />} />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
