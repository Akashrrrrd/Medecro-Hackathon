import React from 'react';
import './DoctorPanel.css';
import { Card, ListGroup, Button } from 'react-bootstrap';

const DoctorPanel = () => {
    const todayAppointments = [
        { id: 1, time: '10:00 AM', patient: 'John Doe', reason: 'High blood pressure', status: 'Confirmed' },
        { id: 2, time: '11:30 AM', patient: 'Jane Smith', reason: 'Routine check-up', status: 'Pending' },
    ];

    const patientRequests = [
        { id: 1, patient: 'John Doe', request: 'Renew prescription for Paracetamol 500mg', status: 'Pending' },
        { id: 2, patient: 'Jane Smith', request: 'View test results', status: 'Completed' },
    ];

    return (
        <div className="doctor-panel">
            <div className="header">
                <h1>Welcome, Dr. [Doctor Name]</h1>
                <p>Manage your appointments, patients, and prescription requests efficiently.</p>
            </div>

            <div className="doctor-content">
                <Card className="dashboard-card">
                    <Card.Header className="card-header">Today's Appointments</Card.Header>
                    <ListGroup variant="flush">
                        {todayAppointments.map(appointment => (
                            <ListGroup.Item key={appointment.id} className="list-item">
                                <div>
                                    <strong>{appointment.time}</strong>
                                    <p>Patient: {appointment.patient} - {appointment.reason}</p>
                                </div>
                                <Button variant="outline-secondary" size="sm">{appointment.status}</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>

                <Card className="dashboard-card">
                    <Card.Header className="card-header">Patient Requests</Card.Header>
                    <ListGroup variant="flush">
                        {patientRequests.map(request => (
                            <ListGroup.Item key={request.id} className="list-item">
                                <div>
                                    <strong>{request.patient}</strong>
                                    <p>{request.request}</p>
                                </div>
                                <Button variant="outline-secondary" size="sm">{request.status}</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            </div>
        </div>
    );
};

export default DoctorPanel;
