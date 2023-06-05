import Landing from "./components/Landing/Landing.jsx";
import Home from "./components/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Card from "./components/Card/Card.jsx";
import Search from "./components/Search/Search.jsx";
import Detail from "./components/Detail/Detail.jsx";
import Form from "./components/Form/Form.jsx";
import "./App.css";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/videogames" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:idVideogame" element={<Detail />} />
        <Route path="/create" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
