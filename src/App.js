import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Component/Home';
import About from './Component/About';
import Navbar from './Component/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path='/about' element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
