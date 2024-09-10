import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FaChartLine, FaUserInjured, FaCalendarAlt, FaUserMd, FaPrescription, 
         FaVial, FaMoneyBillAlt, FaFileAlt, FaBoxes, FaCog, FaBars, FaVideo } from 'react-icons/fa';

const Sidebar = ({ onToggle, selectedPanel }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        onToggle(!isOpen); 
    };

    const renderLinks = () => (
        selectedPanel === 'Patient'
            ? (
                <>
                    <li><Link to="/appointments"><FaCalendarAlt /> <span>Appointments</span></Link></li>
                    <li><Link to="/prescriptions"><FaPrescription /> <span>Prescriptions</span></Link></li>
                    <li><Link to="/medical-tests"><FaVial /> <span>Medical Tests</span></Link></li>
                    <li><Link to="/billing"><FaMoneyBillAlt /> <span>Billing</span></Link></li>
                    <li><Link to="/reports"><FaFileAlt /> <span>Reports</span></Link></li>
                    <li><Link to="/telemedicine"><FaVideo /> <span>Telemedicine</span></Link></li>
                </>
            )
            : selectedPanel === 'Doctor'
                ? (
                    <>
                        <li><Link to="/patients"><FaUserInjured /> <span>Patients</span></Link></li>
                        <li><Link to="/appointments"><FaCalendarAlt /> <span>Appointments</span></Link></li>
                        <li><Link to="/prescriptions"><FaPrescription /> <span>Prescriptions</span></Link></li>
                        <li><Link to="/medical-tests"><FaVial /> <span>Medical Tests</span></Link></li>
                        <li><Link to="/billing"><FaMoneyBillAlt /> <span>Billing</span></Link></li>
                        <li><Link to="/reports"><FaFileAlt /> <span>Reports</span></Link></li>
                        <li><Link to="/inventory"><FaBoxes /> <span>Inventory</span></Link></li>
                        <li><Link to="/telemedicine"><FaVideo /> <span>Telemedicine</span></Link></li>
                        <li><Link to="/settings"><FaCog /> <span>Settings</span></Link></li>
                    </>
                )
                : (
                    <>
                        <li><Link to="/"><FaChartLine /> <span>Dashboard</span></Link></li>
                        <li><Link to="/patients"><FaUserInjured /> <span>Patients</span></Link></li>
                        <li><Link to="/appointments"><FaCalendarAlt /> <span>Appointments</span></Link></li>
                        <li><Link to="/doctors"><FaUserMd /> <span>Doctors</span></Link></li>
                        <li><Link to="/prescriptions"><FaPrescription /> <span>Prescriptions</span></Link></li>
                        <li><Link to="/medical-tests"><FaVial /> <span>Medical Tests</span></Link></li>
                        <li><Link to="/billing"><FaMoneyBillAlt /> <span>Billing</span></Link></li>
                        <li><Link to="/reports"><FaFileAlt /> <span>Reports</span></Link></li>
                        <li><Link to="/inventory"><FaBoxes /> <span>Inventory</span></Link></li>
                        <li><Link to="/telemedicine"><FaVideo /> <span>Telemedicine</span></Link></li>
                        <li><Link to="/settings"><FaCog /> <span>Settings</span></Link></li>
                    </>
                )
    );

    return (
        <div className={`sidebar ${isOpen ? '' : 'closed'}`}>
            <button className="menu-button" onClick={toggleSidebar}>
                <FaBars />
            </button>
            <ul className="sidebar-links">
                {renderLinks()}
            </ul>
        </div>
    );
};

export default Sidebar;
