import Landing from "./components/Landing/Landing.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Card from "./components/Card/Card.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/videogames" element={<Card />} />
      </Routes>
    </div>
  );
}

export default App;
