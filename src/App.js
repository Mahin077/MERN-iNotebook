import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Component/Home';
import About from './Component/About';
import Navbar from './Component/Navbar';
import NoteState from './context/NoteState';


function App() {
  return (
    <>
    
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path='/about' element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
      
    </>
  );
}

export default App;
