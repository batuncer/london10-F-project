import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/main";
import SignUp from "../pages/signup";
import Login from "../pages/login";
import Create from "../pages/create";
import Admin from "../pages/Admin"
import Profile from "../pages/profil";



const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/main" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create" element={<Create />} />

    </Routes>
  );
};

export default MainRoutes;
