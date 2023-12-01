import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SlackLoginButton from "./SlackLoginButton";


export default function SignUpForm({ handleSlackSignup }) {
    return (
        <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <div>
                <img
                    src="https://miro.medium.com/v2/resize:fit:1199/1*1bpa1wQ4ktPd_z9oG1CuZA.jpeg"
                    alt="Platform Logo"
                    style={{ width: '50%' , margin:'5px'}}
                />
            </div>
            <div >
                <div style={{ marginBottom: '30px' }}>
                <Typography component="h1" variant="h4">
                    Welcome to Our Platform!
                </Typography>
                <Typography component="h4" variant="h6">
                    Explore our courses and upcoming classes.
                </Typography>
                </div>
                <div>
                <SlackLoginButton
                    onLoged={handleSlackSignup}
                    onError={(error) => {
                        alert(error);
                    }}
                />
                </div>
            </div>
        </Container>
    );
}
