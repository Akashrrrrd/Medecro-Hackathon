import React from 'react';
import './PatientPanel.css';

const PatientPanel = () => {
    const bookings = [
        { id: 1, name: 'Avinash Kr', date: '5 Oct 2024', status: 'Completed' },
        { id: 2, name: 'GreatStack', date: '26 Sep 2024', status: 'Cancelled' },
        { id: 3, name: 'GreatStack', date: '25 Sep 2024', status: 'Completed' },
        { id: 4, name: 'GreatStack', date: '23 Sep 2024', status: 'Completed' },
    ];

    return (
        <div className="patient-panel">
            <div className="sidebar">
                <div className="logo">Prescripto <span>Patient</span></div>
                <ul>
                    <li className="active">Dashboard</li>
                    <li>Appointments</li>
                    <li>Profile</li>
                </ul>
            </div>
            <div className="main-content">
                <header>
                    <div className="header-left">
                        <h2>Dashboard</h2>
                    </div>
                    <div className="header-right">
                        <button className="logout-btn">Logout</button>
                    </div>
                </header>
                <div className="metrics">
                    <div className="metric-card">
                        <h3>$130</h3>
                        <p>Earnings</p>
                    </div>
                    <div className="metric-card">
                        <h3>4</h3>
                        <p>Appointments</p>
                    </div>
                    <div className="metric-card">
                        <h3>2</h3>
                        <p>Doctors</p>
                    </div>
                </div>
                <div className="latest-bookings">
                    <h3>Latest Bookings:</h3>
                    <div className="bookings-list">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="booking-item">
                                <div className="booking-info">
                                    <img src={`https://i.pravatar.cc/50?img=${booking.id}`} alt="Patient" />
                                    <div>
                                        <h4>{booking.name}</h4>
                                        <p>Booking on {booking.date}</p>
                                    </div>
                                </div>
                                <div className={`status ${booking.status.toLowerCase()}`}>{booking.status}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientPanel;
