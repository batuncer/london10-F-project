import React, { useState, useEffect } from "react";
import "../../styles/Profile.scss"

const ProfileDetails = () => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        city: "",
        default_role: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // user data from API
                const response = await fetch("https://classplannner-server.onrender.com/api/profile");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Error fetching user data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="profile-details">
            <div className="left-container">
                <img className="profile-img" src="/" alt="Profile Image" />
                <h2 className="gradienttext">John Doe</h2>
            </div>
            <div className="right-container">
                <h3 className="gradienttext">Profile Details</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Full Name :</td>
                            <td>{`${user.first_name} ${user.last_name}`}</td>
                        </tr>

                        <tr>
                            <td>Email :</td>
                            <td>{user.default_role}</td>
                        </tr>
                        <tr>
                            <td>City :</td>
                            <td>{user.city}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProfileDetails;
