import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/auth-components/SignUpForm";
import { makeStyles } from '@mui/styles';
import backgroundImage from '../assets/cyf.png';
import Box from '@mui/material/Box';
import BottomCard from "../components/main-bottom/BottomCard"
import LoginGuard from "../auth/LoginGuard";
import { useAuthContext } from "../auth/useAutContext";
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        //color: theme.palette.common.white,  // Set text color to white or light color for contrast
    },
}));
export default function SignUp() {
    const classes = useStyles();
    const navigate = useNavigate();
    const { loginWithSlack, register } = useAuthContext()

    const handleSignup = () => {
        navigate("/main");
    }
    const handleSlackSignup = (token) => {

        loginWithSlack(token)
    }

    return (
        <LoginGuard>
            <Box sx={{ flexGrow: 1 }}>
                <div className={classes.root}>
                    <SignUpForm handleSignup={handleSignup} handleSlackSignup={handleSlackSignup} />
                </div>
                <div style={{
                    width: "80%",
                    margin: "0 auto", borderTop: "2px solid red", marginTop: "90px"
                }}></div>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', margin: "50px", marginTop: "10px" }}>
                    <BottomCard h1={"Become a Student"} image={"https://codeyourfuture.io/wp-content/uploads/2022/06/Volunteer-Tech.jpg"} link={"https://codeyourfuture.io/become-a-student/"} />
                    <BottomCard h1={"Volunteer with CodeYourFuture"} image={"https://codeyourfuture.io/wp-content/uploads/2023/11/Volunteer-Coco-v02.jpg"} link={"https://codeyourfuture.io/volunteers/"} />
                    <BottomCard h1={"Hire a Graduate"} image={"https://codeyourfuture.io/wp-content/uploads/2023/06/Volunteer-Employability-1.png"} link={"https://codeyourfuture.io/hire-a-graduate/"} />
                </div>
            </Box >
        </LoginGuard>

    )
}





