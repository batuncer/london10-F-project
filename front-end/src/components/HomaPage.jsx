import * as React from 'react';
import HomePageMain from './HomePageMain';
import Box from '@mui/material/Box';
import BottomCard from "./main-bottom/BottomCard"

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <HomePageMain />
            <div style={{
                width: "80%",
                margin: "0 auto", borderTop: "2px solid red", marginTop: "90px"}}></div>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', margin: "50px", marginTop: "90px" }}>
                <BottomCard h1={"Become a Student"} image={"https://codeyourfuture.io/wp-content/uploads/2022/06/Volunteer-Tech.jpg"} link={"https://codeyourfuture.io/become-a-student/"}/>
                <BottomCard h1={"Volunteer with CodeYourFuture"} image={"https://codeyourfuture.io/wp-content/uploads/2023/11/Volunteer-Coco-v02.jpg"} link={"https://codeyourfuture.io/volunteers/"} />
                <BottomCard h1={"Hire a Graduate"} image={"https://codeyourfuture.io/wp-content/uploads/2023/06/Volunteer-Employability-1.png"} link={"https://codeyourfuture.io/hire-a-graduate/"} />
            </div>
        </Box>
    );
}
