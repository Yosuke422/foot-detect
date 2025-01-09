import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./components/AuthContext";
import CreateDetection from "./pages/CreateDetection";
import BookingPage from "./pages/BookingPage";
import Reservation from "./pages/Reservation";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-detection" element={<CreateDetection />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
