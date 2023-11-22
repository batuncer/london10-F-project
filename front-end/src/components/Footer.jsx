import React from "react";

const Footer = () => {
    return (
        <div className="footer">
            <p>
                © Code Your Future, All rights reserved | Registered{" "}
                <a
                    className="footer-link"
                    href="https://register-of-charities.charitycommission.gov.uk/charity-details/?regid=1174929&subid=0"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    UK
                </a>{" "}
                and{" "}
                <a
                    className="footer-link"
                    href="https://www.oscr.org.uk/about-charities/search-the-register/charity-details?number=SC050753"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Scottish charity
                </a>
            </p>
        </div>
    );
}

export default Footer;