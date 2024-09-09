import React, { useState } from "react";
import "./Patients.css";
import {
  FaUser,
  FaBirthdayCake,
  FaGenderless,
  FaPhone,
  FaEnvelope,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";

const Patients = ({ patients, addPatient }) => {
  const [showModal, setShowModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    problem: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
    setNewPatient({
      name: "",
      dob: "",
      gender: "",
      phone: "",
      email: "",
      problem: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    if (Object.values(newPatient).some((field) => field.trim() === "")) {
      setError("Please fill in all fields.");
      return false;
    }
    // Additional validations like email and phone can be added here.
    return true;
  };

  const handleAddPatient = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await addPatient(newPatient); // Assuming addPatient is an async function.
      setNewPatient({
        name: "",
        dob: "",
        gender: "",
        phone: "",
        email: "",
        problem: "",
      });
      handleCloseModal();
    } catch (err) {
      setError("Failed to add patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const modalAnimation = useSpring({
    opacity: showModal ? 1 : 0,
    transform: showModal ? "translateY(0)" : "translateY(-30px)",
    config: { tension: 220, friction: 25 },
  });

  return (
    <div className="patients-wrapper">
      <header className="patients-header">
        <h1>Patients List</h1>
        <button className="add-patient-button" onClick={handleShowModal}>
          Add Patient
        </button>
      </header>
      <div className="patients-grid">
        {patients.map((patient) => (
          <animated.div className="patient-card" key={patient.id}>
            <div className="patient-card-header">
              <h2 className="patient-name">
                <FaUser /> {patient.name}
              </h2>
            </div>
            <div className="patient-card-body">
              <p>
                <FaBirthdayCake /> <span className="label">Date of Birth:</span> {patient.dob}
              </p>
              <p>
                <FaGenderless /> <span className="label">Gender:</span> {patient.gender}
              </p>
              <p>
                <FaPhone /> <span className="label">Phone:</span> {patient.phone}
              </p>
              <p>
                <FaEnvelope /> <span className="label">Email:</span> {patient.email}
              </p>
              <p>
                <FaExclamationTriangle /> <span className="label">Problem:</span> {patient.problem}
              </p>
            </div>
            <div className="patient-card-footer">
              <button className="view-details-button">View Details</button>
            </div>
          </animated.div>
        ))}
      </div>

      {showModal && (
        <animated.div
          className="modal-overlay"
          style={modalAnimation}
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-patient-title"
        >
          <div className="modal-content">
            <header className="modal-header">
              <h2 id="add-patient-title">Add New Patient</h2>
              <button
                className="close-button"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                X
              </button>
            </header>
            <div className="modal-body">
              {error && <p className="error-message">{error}</p>}
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newPatient.name}
                    onChange={handleInputChange}
                    aria-required="true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={newPatient.dob}
                    onChange={handleInputChange}
                    aria-required="true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={newPatient.gender}
                    onChange={handleInputChange}
                    aria-required="true"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={newPatient.phone}
                    onChange={handleInputChange}
                    aria-required="true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newPatient.email}
                    onChange={handleInputChange}
                    aria-required="true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="problem">Problem</label>
                  <input
                    type="text"
                    id="problem"
                    name="problem"
                    value={newPatient.problem}
                    onChange={handleInputChange}
                    aria-required="true"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="save-button" onClick={handleAddPatient} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </animated.div>
      )}
    </div>
  );
};

export default Patients;
