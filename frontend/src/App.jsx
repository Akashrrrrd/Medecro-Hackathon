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
        { id: 1, name: 'Aarav Sharma', dob: '1985-07-20', gender: 'Male', phone: '9876543210', email: 'aarav.sharma@example.com', problem: 'High blood pressure' },
        { id: 2, name: 'Meera Patel', dob: '1990-03-15', gender: 'Female', phone: '9123456789', email: 'meera.patel@example.com', problem: 'Diabetes' },
        { id: 3, name: 'Rohan Gupta', dob: '1978-09-22', gender: 'Male', phone: '9988776655', email: 'rohan.gupta@example.com', problem: 'Asthma' },
        { id: 4, name: 'Sanya Iyer', dob: '1995-01-30', gender: 'Female', phone: '9865327410', email: 'sanya.iyer@example.com', problem: 'Thyroid Disorder' },
        { id: 5, name: 'Vikram Singh', dob: '1982-05-10', gender: 'Male', phone: '9933445566', email: 'vikram.singh@example.com', problem: 'Cholesterol Issues' },
    ]);
    

    const [appointments, setAppointments] = useState([
        { id: 1, name: 'Ananya Desai', date: '2024-08-20', time: '10:00', phone: '9823045691' },
        { id: 2, name: 'Rahul Chatterjee', date: '2024-08-21', time: '11:00', phone: '9912567834' },
        { id: 3, name: 'Sneha Nair', date: '2024-08-19', time: '10:00', phone: '9786543210' },
        { id: 4, name: 'Arjun Kapoor', date: '2024-08-22', time: '14:00', phone: '9845123789' },
        { id: 5, name: 'Pooja Mishra', date: '2024-08-23', time: '09:30', phone: '9954123678' },
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