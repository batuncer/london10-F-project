import React, { useState, useEffect } from "react";
import axios from "../../utils/axios"

const SignUpClassesDetails = () => {
    const [signUpDetails, setSignUpDetails] = useState([]);

    useEffect(() => {
        const fetchSignUpDetails = async () => {
            try {
                // Fetch sign-up details from your backend
                const response = await axios.get("api/signup-details");
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
            // Send a request to cancel sign-up for the specified class
            await axios.post(`api/cancel-signup/${sessionId}`);

            // Update the local state to reflect the changes
            setSignUpDetails((prevDetails) =>
                prevDetails.filter((classDetail) => classDetail.id !== sessionId)
            );
        } catch (error) {
            console.error("Error canceling sign-up:", error);
        }
    };
    return (
        <div>
            {signUpDetails.length > 0 ? (
                signUpDetails.map((attendance) => (
                    <div key={attendance.id} style={{ display: "inline-block", margin: "10px", padding: "10px", border: "1px solid #ccc" }}>
                        {attendance.role} -- {attendance.location}
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
