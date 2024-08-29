import React, { useState } from 'react';
import './Prescriptions.css';
import { FaUser, FaCalendarAlt, FaPills, FaEye, FaSave, FaTrash } from 'react-icons/fa';

const initialPrescriptions = [
  { id: 1, patientName: 'John Doe', date: '2024-08-20', medication: 'Lisinopril', dosage: '10mg', notes: 'Take after breakfast' },
  { id: 2, patientName: 'Jane Smith', date: '2024-08-21', medication: 'Metformin', dosage: '500mg', notes: 'Take with food' },
];

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPrescriptionId, setCurrentPrescriptionId] = useState(null);
  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
    date: '',
    medication: '',
    dosage: '',
    notes: ''
  });

  const handleShowModal = (prescription = null) => {
    setIsEditing(!!prescription);
    setCurrentPrescriptionId(prescription ? prescription.id : null);
    setNewPrescription(prescription || {
      patientName: '',
      date: '',
      medication: '',
      dosage: '',
      notes: ''
    });
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentPrescriptionId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrescription(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddPrescription = () => {
    const newId = prescriptions.length ? Math.max(...prescriptions.map(p => p.id)) + 1 : 1;
    const updatedPrescriptions = [...prescriptions, { id: newId, ...newPrescription }];
    setPrescriptions(updatedPrescriptions);
    handleCloseModal();
  };

  const handleEditPrescription = () => {
    const updatedPrescriptions = prescriptions.map(p =>
      p.id === currentPrescriptionId ? { ...p, ...newPrescription } : p
    );
    setPrescriptions(updatedPrescriptions);
    handleCloseModal();
  };

  const handleDeletePrescription = (id) => {
    const updatedPrescriptions = prescriptions.filter(p => p.id !== id);
    setPrescriptions(updatedPrescriptions);
  };

  return (
    <div className="prescriptions-container">
      <header className="prescriptions-header">
        <h1>Prescriptions</h1>
        <button className="add-prescription-button" onClick={() => handleShowModal()}>Add Prescription</button>
      </header>
      <div className="prescriptions-list">
        {prescriptions.map(prescription => (
          <div className="prescription-card" key={prescription.id}>
            <div className="prescription-card-header">
              <h2 className="patient-name"><FaUser /> {prescription.patientName}</h2>
            </div>
            <div className="prescription-card-body">
              <p><FaCalendarAlt /> <span className="label">Date:</span> {prescription.date}</p>
              <p><FaPills /> <span className="label">Medication:</span> {prescription.medication}</p>
              <p><FaPills /> <span className="label">Dosage:</span> {prescription.dosage}</p>
              <p><FaPills /> <span className="label">Notes:</span> {prescription.notes}</p>
            </div>
            <div className="prescription-card-footer">
              <button className="view-details-button" onClick={() => { /* No functionality */ }}><FaEye /> View Details</button>
              <button className="delete-button" onClick={() => handleDeletePrescription(prescription.id)}><FaTrash /> Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <header className="modal-header">
              <h2>{isEditing ? 'Edit Prescription' : 'Add Prescription'}</h2>
              <button className="close-button" onClick={handleCloseModal}>X</button>
            </header>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="patientName">Patient Name</label>
                  <input type="text" id="patientName" name="patientName" value={newPrescription.patientName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input type="date" id="date" name="date" value={newPrescription.date} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="medication">Medication</label>
                  <input type="text" id="medication" name="medication" value={newPrescription.medication} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="dosage">Dosage</label>
                  <input type="text" id="dosage" name="dosage" value={newPrescription.dosage} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="notes">Notes</label>
                  <textarea id="notes" name="notes" value={newPrescription.notes} onChange={handleInputChange} rows="4" required />
                </div>
                <button type="button" className="submit-button" onClick={isEditing ? handleEditPrescription : handleAddPrescription}>
                  {isEditing ? 'Save Changes' : 'Add Prescription'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
