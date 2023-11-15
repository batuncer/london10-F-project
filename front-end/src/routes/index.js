// MainRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/login.jsx";
import Header from "../components/header/header.jsx";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default MainRoutes;
