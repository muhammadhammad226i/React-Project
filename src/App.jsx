import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Sign-up/SignUp";

const App = () => {
  return (
    <div>
      <Routes>
       
        <Route path="/" element={<Navigate to="/signup" replace />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
