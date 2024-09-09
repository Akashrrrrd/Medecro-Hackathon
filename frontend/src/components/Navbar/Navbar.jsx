import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBell, FaUserCircle, FaQuestionCircle, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import LoginPopup from '../LoginPopup/LoginPopup'; // Import LoginPopup component

const Navbar = ({ isSidebarOpen, toggleTheme, isDarkMode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in initially
    const [showLogin, setShowLogin] = useState(false); // State to manage login popup visibility

    const handleLogout = () => {
        // Perform logout logic here
        setIsLoggedIn(false);
    };

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    return (
        <nav className={`navbar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'} ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="navbar-logo">
                <img src={logo} alt="Clinic Logo" />
                <h2>SmartClinic Manager</h2>
            </div>
            <div className="navbar-actions">
                <button className="icon-button">
                    <FaBell /><span className="notification-badge">3</span>
                </button>
                {isLoggedIn && (
                    // Wrap the user icon in a Link component to redirect to PatientPortal
                    <Link to="/patient-portal" className="icon-button">
                        <FaUserCircle />
                    </Link>
                )}
                <Link to="/help" className="icon-button">
                    <FaQuestionCircle />
                </Link>
                <select className="language-selector">
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="ta">தமிழ்</option>
                </select>
                {isLoggedIn ? (
                    <button className="logout-button" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                ) : (
                    <button className="login-button" onClick={handleLoginClick}>
                        Login
                    </button>
                )}
                <button className="theme-toggle" onClick={toggleTheme}>
                    {isDarkMode ? <FaSun /> : <FaMoon />}
                </button>
            </div>
            {showLogin && !isLoggedIn && <LoginPopup setShowLogin={setShowLogin} />}
        </nav>
    );
};

export default Navbar;
