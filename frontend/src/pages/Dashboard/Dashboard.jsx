import React from 'react';
import './Dashboard.css';
import { FaUserInjured, FaCalendarAlt, FaChartLine, FaClock } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Dashboard = ({ patientsCount, appointmentsCount, upcomingAppointments }) => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Appointments',
                data: [30, 45, 60, 70, 80, 90, 110],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                fill: true,
            },
            {
                label: 'Revenue',
                data: [5000, 6000, 7000, 8000, 9000, 10000, 12000],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                fill: true,
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat().format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        }
    };

    const cardData = [
        { icon: <FaUserInjured />, title: 'Patients', value: patientsCount },
        { icon: <FaCalendarAlt />, title: 'Appointments', value: appointmentsCount },
        { icon: <FaClock />, title: 'Upcoming Appointments', value: upcomingAppointments }, // New metric
        { icon: <FaChartLine />, title: 'Performance', value: '+8% This Month' },
    ];

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Welcome, Dr. Akash Rajendran</h1>
                <p>Here's an overview of your clinic’s performance</p>
            </header>
            <div className="dashboard-content">
                <div className="dashboard-cards">
                    {cardData.map((card, index) => (
                        <div key={index} className="card animate-card">
                            <div className="card-icon">{card.icon}</div>
                            <div className="card-info">
                                <h2>{card.title}</h2>
                                <p>{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="dashboard-charts animate-charts">
                    <h2>Monthly Performance</h2>
                    <Line data={data} options={chartOptions} />
                </div>
                <div className="dashboard-recent-activities animate-activities">
                    <h2>Recent Activities</h2>
                    <ul>
                        <li>Patient John Doe had a follow-up appointment.</li>
                        <li>New prescription created for patient Alice Johnson.</li>
                        <li>Revenue report generated for the month of July.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
