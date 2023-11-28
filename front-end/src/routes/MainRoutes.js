import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/main";
import SignUp from "../pages/signup";
import Login from "../pages/login";
import Admin from "../pages/Admin"


const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/main" element={<Main />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/admin' element={<Admin />} />
    </Routes>
  );
};

export default MainRoutes;
