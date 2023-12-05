import React from "react";
import SignUpClassesDetails from "./signUpClassesDetails";

const ProfileDetails = ({ user }) => (
  <div className="profile-details">
    <div className="left-container">
      <img className="profile-img" src={user.avatar} alt="Profile Image" />
      <table>
        <tbody>
          <tr>
            <td>Name :</td>
            <td>{`${user.first_name} ${user.last_name}`}</td>
          </tr>
          <tr>
            <td>Email :</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>City :</td>
            <td>{user.homecity}</td>
          </tr>
          <tr>
            <td>Role :</td>
            <td>{user.default_role}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="right-container">
      <SignUpClassesDetails  />
    </div>
  </div>
);

export default ProfileDetails;