import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/auth-components/SignUpForm";
import { makeStyles } from '@mui/styles';
import backgroundImage from '../assets/cyf.png';
import Box from '@mui/material/Box';
import BottomCard from "../components/main-bottom/BottomCard"
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

    const handleSignup = () => {
        navigate("/main");
    }

    return (
        <Box>
            <div className={classes.root}>
                <SignUpForm  handleSignup={handleSignup} />
            </div>
            <div style={{border: "1px solid red", marginTop: "100px", marginRight: "120px", marginLeft: "120px"}}></div>
            <div style={{ display: 'flex', gap: '66px', justifyContent: 'center', margin: "190px", marginTop: "90px" }}>
                <BottomCard h1={"Become a Student"} image={"https://codeyourfuture.io/wp-content/uploads/2022/06/Volunteer-Tech.jpg"} link={"https://codeyourfuture.io/become-a-student/"} />
                <BottomCard h1={"Volunteer with CodeYourFuture"} image={"https://codeyourfuture.io/wp-content/uploads/2023/11/Volunteer-Coco-v02.jpg"} link={"https://codeyourfuture.io/volunteers/"} />
                <BottomCard h1={"Hire a Graduate"} image={"https://codeyourfuture.io/wp-content/uploads/2023/06/Volunteer-Employability-1.png"} link={"https://codeyourfuture.io/hire-a-graduate/"} />
            </div>
        </Box >
    )
}





