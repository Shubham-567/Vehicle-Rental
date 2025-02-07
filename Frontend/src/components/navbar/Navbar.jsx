import logo from "../../assets/logo.png";
import userProfileLogo from "../../assets/user-profile.png";
import styles from "./Navbar.module.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isHidden, setIsHidden] = useState(true);

  console.log(user);

  return (
    <nav className={styles.navbar}>
      <img src={logo} className={styles.logo} alt='Company Logo' />

      <div className={styles.navContainer}>
        <ul className={styles.links}>
          <li>Home</li>
          <li>Browse Vehicles</li>
          <li>Contact Us</li>
        </ul>

        {isAuthenticated ? (
          <div className={styles.userProfile}>
            <img
              src={userProfileLogo}
              alt='A logo of user profile'
              onClick={() => setIsHidden(!isHidden)}
            />

            <div
              className={`${styles.dropdown}  ${
                isHidden ? styles.hidden : ""
              }`}>
              <ul>
                <li>Dashboard</li>
                <li>My Bookings</li>
                <li onClick={logout}>Logout</li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            type='button'
            onClick={() => navigate("/login")}
            className={styles.navbarButton}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
