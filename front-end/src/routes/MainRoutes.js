import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/main";
import SignUp from "../pages/signup";
import Login from "../pages/login";


const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/main" element={<Main />}/>
      <Route path='/login' element={<Login />}/>
    </Routes>
  );
};

export default MainRoutes;
