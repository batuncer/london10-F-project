// MainRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login/login.jsx";
import SignUpPage from "../pages/signup/signup.jsx";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={< SignUpPage/>} />
    </Routes>
  );
};

export default MainRoutes;
