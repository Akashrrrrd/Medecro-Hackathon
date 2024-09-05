import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard'; 
import Patients from './pages/Patients/Patients';
import Appointments from './pages/Appointments/Appointments';
import Doctors from './pages/Doctors/Doctors';
import Prescriptions from './pages/Prescriptions/Prescriptions';
import Reports from './pages/Reports/Reports';
import Inventory from './pages/Inventory/Inventory';
import Billing from './pages/Billing/Billing';
import MedicalTests from './pages/MedicalTests/MedicalTests';
import Settings from './pages/Settings/Settings';
import Help from './pages/Help/Help'; 
import Telemedicine from './pages/Telemedicine/Telemedicine';
import PatientPortal from './pages/PatientPortal/PatientPortal';

const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const [patients, setPatients] = useState([
        { id: 1, name: 'John Doe', dob: '1985-07-20', gender: 'Male', phone: '123-456-7890', email: 'john@example.com', problem: 'High blood pressure' },
        { id: 2, name: 'Jane Smith', dob: '1990-03-15', gender: 'Female', phone: '987-654-3210', email: 'jane@example.com', problem: 'Diabetes' },
    ]);

    const [appointments, setAppointments] = useState([
        { id: 1, name: 'John Doe', date: '2024-08-20', time: '10:00', phone: '123-456-7890' },
        { id: 2, name: 'Jane Smith', date: '2024-08-21', time: '11:00', phone: '987-654-3210' },
        { id: 3, name: 'Akash R', date: '2024-08-19', time: '10:00', phone: '875-468-0977' },
    ]);

    const handleToggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };

    const addPatient = (newPatient) => {
        const newId = Date.now();
        setPatients([...patients, { id: newId, ...newPatient }]);
    };

    const addAppointment = (newAppointment) => {
        const newId = Date.now();
        setAppointments([...appointments, { id: newId, ...newAppointment }]);
    };

    return (
        <Router>
            <Sidebar onToggle={handleToggleSidebar} />
            <Navbar isSidebarOpen={isSidebarOpen} toggleTheme={toggleTheme} />
            <main style={{ marginLeft: isSidebarOpen ? '280px' : '60px', transition: 'margin-left 0.3s ease' }}>
                <Routes>
                    <Route path="/" element={<Dashboard patientsCount={patients.length} appointmentsCount={appointments.length} />} />
                    <Route path='/patients' element={<Patients patients={patients} addPatient={addPatient} />} />
                    <Route path='/appointments' element={<Appointments addAppointment={addAppointment} />} />
                    <Route path='/doctors' element={<Doctors />} />
                    <Route path='/prescriptions' element={<Prescriptions />} />
                    <Route path='/reports' element={<Reports />} />
                    <Route path='/inventory' element={<Inventory />} />
                    <Route path='/billing' element={<Billing />} />
                    <Route path='/medical-tests' element={<MedicalTests />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/help' element={<Help />} /> 
                    <Route path='/telemedicine' element={<Telemedicine/>}/>
                    <Route path='/patient-portal' element={<PatientPortal/>}/>
                </Routes>
            </main>
        </Router>
    );
};

export default Layout;
