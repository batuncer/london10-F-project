import React from "react";
import ProfileDetails from "../components/profile/profileDetails";
import SignUpClasses from "../components/profile/signUpClasses";
import UserGuard from "../auth/UserGuard";
import Navbar from "../components/barComponents/Navbar";

export default function Profile() {
    return (
        <UserGuard>
            <div>
                <Navbar />
                <ProfileDetails />
                <SignUpClasses />
            </div>
        </UserGuard>
    );
}
