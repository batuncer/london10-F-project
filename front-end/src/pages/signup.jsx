import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/auth-components/SignUpForm";
import { makeStyles } from '@mui/styles';
import backgroundImage from '../assets/cyf.png';
import Box from '@mui/material/Box';
import BottomCard from "../components/main-bottom/BottomCard"
import LoginGuard from "../auth/LoginGuard";
import { useAuthContext } from "../auth/useAutContext";


export default function SignUp() {
    const navigate = useNavigate();
    const { loginWithSlack, register } = useAuthContext();

    const handleSignup = () => {
        navigate("/main");
    }

    const handleSlackSignup = (token) => {
        loginWithSlack(token);
    }

    return (
        <LoginGuard>
            <Box >
                <div>
                    <SignUpForm handleSignup={handleSignup} handleSlackSignup={handleSlackSignup} />
                </div>
          
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center'}}>
                    <BottomCard h1={"Become a Student"} image={"https://codeyourfuture.io/wp-content/uploads/2022/06/Volunteer-Tech.jpg"} link={"https://codeyourfuture.io/become-a-student/"} />
                    <BottomCard h1={"Volunteer with CodeYourFuture"} image={"https://codeyourfuture.io/wp-content/uploads/2023/11/Volunteer-Coco-v02.jpg"} link={"https://codeyourfuture.io/volunteers/"} />
                    <BottomCard h1={"Hire a Graduate"} image={"https://codeyourfuture.io/wp-content/uploads/2023/06/Volunteer-Employability-1.png"} link={"https://codeyourfuture.io/hire-a-graduate/"} />
                </div>
            </Box>
        </LoginGuard>
    );
}
