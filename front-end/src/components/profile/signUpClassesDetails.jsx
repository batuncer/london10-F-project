import React, { useState, useEffect } from "react";
import axios from "../../utils/axios"
import "../../styles/Profile.scss"

const SignUpClassesDetails = () => {
    const [signUpDetails, setSignUpDetails] = useState([]);

    useEffect(() => {
        const fetchSignUpDetails = async () => {
            try {
                const response = await axios.get("api/signup-details");
                console.log(response)
                const data = response.data;
                setSignUpDetails(data);
            } catch (error) {
                console.error("Error fetching sign-up details:", error);
            }
        };

        fetchSignUpDetails();
    }, []);

    const handleCancelSignUp = async (sessionId) => {
        try {
            await axios.post(`api/cancel-signup/${sessionId}`);

            setSignUpDetails((prevDetails) =>
                prevDetails.filter((classDetail) => classDetail.id !== sessionId)
            );
        } catch (error) {
            console.error("Error canceling sign-up:", error);
        }
    };

    return (
        <div className="registered-classes-container">
            {signUpDetails.length > 0 ? (
                signUpDetails.map((attendance) => (
                    <div className="registered-classes" key={attendance.id} style={{ display: "inline-block", margin: "10px", padding: "10px", border: "1px solid #ccc" }}>
                        {attendance.role} -- {attendance.location} --- {attendance.first_name}
                        {/* {console.log(attendance)} */}
                        <button onClick={() => handleCancelSignUp(attendance.id)}>
                            Cancel
                        </button>
                    </div>
                ))
            ) : (
                    <div style={{ color:" #36454f"}}>
                    You haven't signed up for any classes.
                </div>
            )}
        </div>
    );
};

export default SignUpClassesDetails;
