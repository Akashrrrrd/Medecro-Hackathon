import React, { useState } from 'react';
import './Reports.css'; // Ensure this CSS file is created and styled appropriately
import { FaFileAlt, FaCalendarAlt, FaUser, FaMoneyBillAlt, FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend);

// Sample data for demonstration purposes
const initialReports = [
  { id: 1, title: 'Monthly Patient Attendance', date: '2024-08-20', type: 'Patient', description: 'Overview of patient attendance for the month.', data: { totalVisits: 120, monthlyTrend: [10, 15, 12, 14, 16, 18, 22, 25, 20, 19, 23, 21] } },
  { id: 2, title: 'Quarterly Revenue Breakdown', date: '2024-08-21', type: 'Financial', description: 'In-depth analysis of revenue for the current quarter.', data: { totalRevenue: '$50,000', revenueTrend: [4000, 4500, 5000, 5500] } },
  { id: 3, title: 'Appointment Scheduling Patterns', date: '2024-08-22', type: 'Operational', description: 'Analysis of appointment scheduling trends and types.', data: { totalAppointments: 85, appointmentTypes: { checkup: 50, followup: 25 } } },
  { id: 4, title: 'Patient Visit Statistics', date: '2024-08-23', type: 'Patient', description: 'Detailed statistics on patient visits throughout the month.', data: { totalVisits: 120, monthlyTrend: [10, 15, 12, 14, 16, 18, 22, 25, 20, 19, 23, 21] } },
  { id: 5, title: 'Current Quarter Revenue Report', date: '2024-08-24', type: 'Financial', description: 'Report on revenue performance for the current quarter.', data: { totalRevenue: '$50,000', revenueTrend: [4000, 4500, 5000, 5500] } },
  { id: 6, title: 'Appointment Analysis Report', date: '2024-08-25', type: 'Operational', description: 'Report on various appointment types and their scheduling trends.', data: { totalAppointments: 85, appointmentTypes: { checkup: 50, followup: 25 } } },
  { id: 7, title: 'Patient Visit Overview', date: '2024-08-26', type: 'Patient', description: 'Overview of patient visit metrics for the month.', data: { totalVisits: 120, monthlyTrend: [10, 15, 12, 14, 16, 18, 22, 25, 20, 19, 23, 21] } },
  { id: 8, title: 'Revenue Performance Report', date: '2024-08-27', type: 'Financial', description: 'Detailed performance report on revenue for the quarter.', data: { totalRevenue: '$50,000', revenueTrend: [4000, 4500, 5000, 5500] } },
  { id: 9, title: 'Trends in Appointment Scheduling', date: '2024-08-28', type: 'Operational', description: 'Analysis of appointment trends and scheduling patterns.', data: { totalAppointments: 85, appointmentTypes: { checkup: 50, followup: 25 } } },
  { id: 10, title: 'Monthly Report on Patient Visits', date: '2024-08-29', type: 'Patient', description: 'Report on patient visits and monthly trends.', data: { totalVisits: 120, monthlyTrend: [10, 15, 12, 14, 16, 18, 22, 25, 20, 19, 23, 21] } },
  { id: 11, title: 'Financial Summary for the Quarter', date: '2024-08-30', type: 'Financial', description: 'Summary of financial performance for the current quarter.', data: { totalRevenue: '$50,000', revenueTrend: [4000, 4500, 5000, 5500] } },
  { id: 12, title: 'Appointment Trends and Analysis', date: '2024-08-31', type: 'Operational', description: 'Analysis of appointment trends and types for the month.', data: { totalAppointments: 85, appointmentTypes: { checkup: 50, followup: 25 } } }
];


const Reports = () => {
  const [reports, setReports] = useState(initialReports);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filter, setFilter] = useState('All');

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const handleCloseDetails = () => {
    setSelectedReport(null);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredReports = reports.filter(report => filter === 'All' || report.type === filter);

  return (
    <div className="reports-container">
      <header className="reports-header">
        <h1><FaFileAlt /> Reports</h1>
        <div className="filter-section">
          <label htmlFor="report-filter">Filter by Type:</label>
          <select id="report-filter" value={filter} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Patient">Patient</option>
            <option value="Financial">Financial</option>
            <option value="Operational">Operational</option>
          </select>
          <button className="refresh-button">Refresh Reports</button>
        </div>
      </header>
      <div className="reports-list">
        {filteredReports.map(report => (
          <div className="report-card" key={report.id}>
            <div className="report-card-header">
              <h2><FaChartLine /> {report.title}</h2>
              <p><FaCalendarAlt /> {report.date}</p>
            </div>
            <div className="report-card-body">
              <p><strong>Type:</strong> {report.type}</p>
              <p>{report.description}</p>
            </div>
            <div className="report-card-footer">
              <button className="view-details-button" onClick={() => handleViewReport(report)}>View Details</button>
            </div>
          </div>
        ))}
      </div>

      {selectedReport && (
        <div className="report-details-overlay">
          <div className="report-details-content">
            <header className="details-header">
              <h2>{selectedReport.title}</h2>
              <button className="close-button" onClick={handleCloseDetails}>X</button>
            </header>
            <div className="details-body">
              <p><strong>Date:</strong> {selectedReport.date}</p>
              <p><strong>Type:</strong> {selectedReport.type}</p>
              <p><strong>Description:</strong> {selectedReport.description}</p>

              <div className="charts-container">
                {selectedReport.data.monthlyTrend && (
                  <div className="chart">
                    <h3>Monthly Visits Trend</h3>
                    <Line
                      data={{
                        labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
                        datasets: [{
                          label: 'Visits',
                          data: selectedReport.data.monthlyTrend,
                          borderColor: '#007bff',
                          backgroundColor: 'rgba(0, 123, 255, 0.2)',
                          borderWidth: 2
                        }]
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { position: 'top' },
                          tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${context.raw}` } }
                        },
                        scales: {
                          x: { title: { display: true, text: 'Month' } },
                          y: { title: { display: true, text: 'Number of Visits' } }
                        }
                      }}
                    />
                  </div>
                )}

                {selectedReport.data.revenueTrend && (
                  <div className="chart">
                    <h3>Revenue Trend</h3>
                    <Bar
                      data={{
                        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                        datasets: [{
                          label: 'Revenue',
                          data: selectedReport.data.revenueTrend,
                          backgroundColor: '#28a745',
                          borderColor: '#218838',
                          borderWidth: 1
                        }]
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { position: 'top' },
                          tooltip: { callbacks: { label: (context) => `${context.dataset.label}: $${context.raw}` } }
                        },
                        scales: {
                          x: { title: { display: true, text: 'Quarter' } },
                          y: { title: { display: true, text: 'Revenue ($)' }, beginAtZero: true }
                        }
                      }}
                    />
                  </div>
                )}

                {selectedReport.data.appointmentTypes && (
                  <div className="appointment-types">
                    <h3>Appointment Types</h3>
                    <p><strong>Checkup:</strong> {selectedReport.data.appointmentTypes.checkup}</p>
                    <p><strong>Follow-up:</strong> {selectedReport.data.appointmentTypes.followup}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
