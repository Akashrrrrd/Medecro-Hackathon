import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBell, FaUserCircle, FaQuestionCircle, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import LoginPopup from '../LoginPopup/LoginPopup';

const Navbar = ({ isSidebarOpen, toggleTheme, isDarkMode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially user is not logged in
    const [showLogin, setShowLogin] = useState(false); // State to manage login popup visibility

    const handleLogout = () => {
        // Perform logout logic here
        setIsLoggedIn(false); // Update state to reflect logged-out status
    };

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    // Function to handle successful login
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setShowLogin(false); // Close the login popup after successful login
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
            {showLogin && (
                <LoginPopup setShowLogin={setShowLogin} onLoginSuccess={handleLoginSuccess} />
            )}
        </nav>
    );
};

export default Navbar;
