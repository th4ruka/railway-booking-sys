import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trains from "./pages/Trains";
import Booking from "./pages/Booking";
import TrainSchedule from "./pages/TrainSchedule";
import TicketCategories from "./pages/TicketCategories";
import SpecialTrains from "./pages/SpecialTrains";  // ✅ Add Special Trains
import Login from "./pages/Login";
import Register from "./pages/Register";
import AGWarrant from "./pages/AGWarrant";
import TourismPackages from "./pages/TourismPackages";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/style.css";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trains" element={<Trains />} />
        <Route path="/schedule" element={<TrainSchedule />} />
        <Route path="/tickets" element={<TicketCategories />} />
        <Route path="/special-trains" element={<SpecialTrains />} /> {/* ✅ Add Special Trains */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/warrant" element={<AGWarrant />} />
        <Route path="/tourism" element={<TourismPackages />} />
        <Route path="/" element={<Home />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
