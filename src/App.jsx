import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/navigation/Login";
import Register from "./components/navigation/Register";
import NavBar from "./components/navigation/NavBar";
import Halls from "./components/pages/Halls";
import Events from "./components/pages/Events";
import AboutUs from "./components/pages/AboutUs";


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/halls" element={<Halls />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
