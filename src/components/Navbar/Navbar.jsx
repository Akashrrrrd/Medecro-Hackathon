import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBell, FaUserCircle, FaQuestionCircle, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Navbar = ({ isSidebarOpen, toggleTheme, isDarkMode }) => {
    return (
        <nav className={`navbar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'} ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="navbar-logo">
                <img src={logo} alt="Clinic Logo" />
                <h2>SmartClinic Manager</h2>
            </div>
            <div className="navbar-actions">
                <button className="icon-button"><FaBell /><span className="notification-badge">3</span></button>
                <button className="icon-button"><FaUserCircle /></button>
                <Link to="/help" className="icon-button"><FaQuestionCircle /></Link>
                <select className="language-selector">
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="ta">தமிழ்</option>
                </select>
                <button className="logout-button"><FaSignOutAlt /> Logout</button>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {isDarkMode ? <FaSun /> : <FaMoon />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
