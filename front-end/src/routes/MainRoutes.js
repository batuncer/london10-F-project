import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/main";
import SignUp from "../pages/signup";
import Login from "../pages/login";
import Admin from "../pages/Admin"
import Profile from "../pages/profil";

// const login = ({params}) => {
//   console.log(params);
  
//   useEffect(() => {
//     localStorage.setItem('jwt', params.code);
//   }, [])

//   return (<Redirect href=/ />)
// }

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/main" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      {/* Correct the path for the profile route */}
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default MainRoutes;
