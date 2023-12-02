import React, { useState, useEffect } from "react";

const SignUpClasses = () => {
    const [signUpDetails, setSignUpDetails] = useState([]);

    useEffect(() => {
        const fetchSignUpDetails = async () => {
            try {
                // Fetch sign-up details from your backend
                const response = await fetch("http://localhost:10000/api/signup-details");
                const data = await response.json();
                setSignUpDetails(data);
            } catch (error) {
                console.error("Error fetching sign-up details:", error);
            }
        };

        fetchSignUpDetails();
    }, []);

    const handleCancelSignUp = async (classId) => {
        try {
            // Send a request to cancel sign-up for the specified class
            await fetch(`/api/cancel-signup/${classId}`, {
                method: "POST",
            });

            // Update the local state to reflect the changes
            setSignUpDetails((prevDetails) =>
                prevDetails.filter((classDetail) => classDetail.id !== classId)
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
                        {attendance.role} - {attendance.period}
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

export default SignUpClasses;
