import React, { useState } from 'react';
import './Doctors.css';
import { FaUser, FaStethoscope, FaPhone, FaEnvelope, FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const doctors = [
  { id: 1, name: 'Dr. John Smith', specialty: 'Cardiologist', phone: '123-456-7890', email: 'john.smith@example.com' },
  { id: 2, name: 'Dr. Jane Doe', specialty: 'Neurologist', phone: '987-654-3210', email: 'jane.doe@example.com' },
  { id: 3, name: 'Dr. Emily Brown', specialty: 'Dermatologist', phone: '456-789-0123', email: 'emily.brown@example.com' },
  { id: 4, name: 'Dr. Michael Johnson', specialty: 'Orthopedic Surgeon', phone: '678-901-2345', email: 'michael.johnson@example.com' },
  { id: 5, name: 'Dr. Sarah Lee', specialty: 'Pediatrician', phone: '890-123-4567', email: 'sarah.lee@example.com' },
  { id: 6, name: 'Dr. Robert White', specialty: 'Gastroenterologist', phone: '234-567-8901', email: 'robert.white@example.com' },
  { id: 7, name: 'Dr. Laura Green', specialty: 'Endocrinologist', phone: '345-678-9012', email: 'laura.green@example.com' },
  { id: 8, name: 'Dr. William Harris', specialty: 'Pulmonologist', phone: '456-789-0123', email: 'william.harris@example.com' },
  { id: 9, name: 'Dr. Karen Patel', specialty: 'Ophthalmologist', phone: '567-890-1234', email: 'karen.patel@example.com' }
];

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBookNow = () => {
    toast.success('You have successfully booked your token!');
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="doctors-container">
      <header className="doctors-header">
        <h1>Our Esteemed Doctors</h1>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search by name or specialty..." 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
          <FaSearch className="search-icon" />
        </div>
      </header>
      <div className="doctors-list">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <div className="doctor-card" key={doctor.id}>
              <div className="doctor-card-header">
                <div className="doctor-avatar">
                  <FaUser className="avatar-icon" />
                </div>
                <h2 className="doctor-name">{doctor.name}</h2>
                <p className="doctor-specialty">{doctor.specialty}</p>
              </div>
              <div className="doctor-card-body">
                <p><FaPhone /> {doctor.phone}</p>
                <p><FaEnvelope /> {doctor.email}</p>
              </div>
              <div className="doctor-card-footer">
                <button className="book-now-button" onClick={handleBookNow}>Book Now</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No doctors found</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Doctors;
