import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../components/HomaPage.jsx"
import Main from "../components/Main.jsx";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/main" element={<Main />}/>
    </Routes>
  );
};

export default MainRoutes;
