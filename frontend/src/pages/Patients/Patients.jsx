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

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddPatient = () => {
    if (Object.values(newPatient).some((field) => field === "")) {
      setError("Please fill in all fields");
      return;
    }
    addPatient(newPatient);
    setNewPatient({
      name: "",
      dob: "",
      gender: "",
      phone: "",
      email: "",
      problem: "",
    });
    handleCloseModal();
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
                <FaBirthdayCake /> <span className="label">Date of Birth:</span>{" "}
                {patient.dob}
              </p>
              <p>
                <FaGenderless /> <span className="label">Gender:</span>{" "}
                {patient.gender}
              </p>
              <p>
                <FaPhone /> <span className="label">Phone:</span>{" "}
                {patient.phone}
              </p>
              <p>
                <FaEnvelope /> <span className="label">Email:</span>{" "}
                {patient.email}
              </p>
              <p>
                <FaExclamationTriangle />{" "}
                <span className="label">Problem:</span> {patient.problem}
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
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={newPatient.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>{" "}
                    {/* Default option */}
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
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="save-button" onClick={handleAddPatient}>
                Save
              </button>
            </div>
          </div>
        </animated.div>
      )}
    </div>
  );
};

export default Patients;
