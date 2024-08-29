import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Appointments.css';
import { FaUser, FaCalendar, FaClock, FaPhone, FaSearch } from 'react-icons/fa';

const Appointments = ({ addAppointment }) => {
  const [appointments, setAppointments] = useState([
    { id: 1, name: 'John Doe', date: '2024-08-20', time: '10:00', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', date: '2024-08-21', time: '11:00', phone: '987-654-3210' },
    { id: 3, name: 'Akash R', date: '2024-08-19', time: '10:00', phone: '875-468-0977' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [date, setDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  const handleShowModal = (appointment = null) => {
    setEditingAppointment(appointment ? { ...appointment } : { name: '', date: '', time: '', phone: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAppointment(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingAppointment(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditAppointment = () => {
    if (!editingAppointment.name || !editingAppointment.date || !editingAppointment.time || !editingAppointment.phone) {
      alert('Please fill in all fields.');
      return;
    }

    // Basic validation for phone number
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(editingAppointment.phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    addAppointment(editingAppointment);
    handleCloseModal();
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
  };

  const isDateWithAppointment = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return appointments.some(appointment => appointment.date === formattedDate);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="appointments-container">
      <header className="appointments-header">
        <h1>Appointments</h1>
        <button className="add-appointment-button" onClick={() => handleShowModal()}>
          Add Appointment
        </button>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by patient name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FaSearch className="search-icon" />
      </div>

      <div className="appointments-grid">
        {filteredAppointments.map(appointment => (
          <div className="appointment-card" key={appointment.id}>
            <div className="appointment-card-header">
              <h2 className="appointment-name"><FaUser /> {appointment.name}</h2>
            </div>
            <div className="appointment-card-body">
              <p><FaCalendar /> <span className="label">Date:</span> {appointment.date}</p>
              <p><FaClock /> <span className="label">Time:</span> {appointment.time}</p>
              <p><FaPhone /> <span className="label">Phone:</span> {appointment.phone}</p>
            </div>
            <div className="appointment-card-footer">
              <button className="edit-button" onClick={() => handleShowModal(appointment)}>Edit</button>
              <button className="delete-button" onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={({ date, view }) => view === 'month' && isDateWithAppointment(date) ? 'highlighted' : null}
          next2Label={null}
          prev2Label={null}
          nextLabel="&#x276F;"
          prevLabel="&#x276E;"
        />
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <header className="modal-header">
              <h2>{editingAppointment?.id ? 'Edit Appointment' : 'Add New Appointment'}</h2>
              <button className="close-button" onClick={handleCloseModal}>X</button>
            </header>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Patient Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editingAppointment?.name || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={editingAppointment?.date || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={editingAppointment?.time || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={editingAppointment?.phone || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="button" className="submit-button" onClick={handleAddOrEditAppointment}>
                  {editingAppointment?.id ? 'Save Changes' : 'Add Appointment'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
