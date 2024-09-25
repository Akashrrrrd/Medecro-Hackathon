import React, { useState } from "react";
import "./Doctors.css";
import {
  FaUser,
  FaStethoscope,
  FaPhone,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const doctors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    phone: "+91 98765 43210",
    email: "priya.sharma@example.com",
  },
  {
    id: 2,
    name: "Dr. Rajesh Gupta",
    specialty: "Dermatologist",
    phone: "+91 87654 32109",
    email: "rajesh.gupta@example.com",
  },
  {
    id: 3,
    name: "Dr. Aisha Khan",
    specialty: "Dermatologist",
    phone: "+91 76543 21098",
    email: "aisha.khan@example.com",
  },
  {
    id: 4,
    name: "Dr. Neha Reddy",
    specialty: "Ophthalmologist",
    phone: "+91 65432 10987",
    email: "neha.reddy@example.com",
  },
  {
    id: 5,
    name: "Dr. Arjun Mehta",
    specialty: "Cardiologist",
    phone: "+91 54321 09876",
    email: "arjun.mehta@example.com",
  },
  {
    id: 6,
    name: "Dr. Suresh Patil",
    specialty: "Pulmonologist",
    phone: "+91 43210 98765",
    email: "suresh.patil@example.com",
  },
  {
    id: 7,
    name: "Dr. Kavita Joshi",
    specialty: "Pulmonologist",
    phone: "+91 32109 87654",
    email: "kavita.joshi@example.com",
  },
  {
    id: 8,
    name: "Dr. Rohan Verma",
    specialty: "Cardiologist",
    phone: "+91 21098 76543",
    email: "rohan.verma@example.com",
  },
  {
    id: 9,
    name: "Dr. Meera Iyer",
    specialty: "Dermatologist",
    phone: "+91 10987 65432",
    email: "meera.iyer@example.com",
  },
  {
    id: 10,
    name: "Dr. Anand Sharma",
    specialty: "Pulmonologist",
    phone: "+91 98765 43211",
    email: "anand.sharma@example.com",
  },
  {
    id: 11,
    name: "Dr. Sneha Bansal",
    specialty: "Ophthalmologist",
    phone: "+91 87654 32110",
    email: "sneha.bansal@example.com",
  },
  {
    id: 12,
    name: "Dr. Tanya Singh",
    specialty: "Dermatologist",
    phone: "+91 76543 21099",
    email: "tanya.singh@example.com",
  },
];

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleBookNow = async (doctor) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/doctors/book",
        doctor
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to book doctor");
    }
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="doctors-container">
      <header className="doctors-header">
        <h1>Our Esteemed Doctors</h1>
      </header>
      <div className="doctors-list">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div className="doctor-card" key={doctor.id}>
              <div className="doctor-card-header">
                <div className="doctor-avatar">
                  <FaUser className="avatar-icon" />
                </div>
                <h2 className="doctor-name">{doctor.name}</h2>
                <p className="doctor-specialty">{doctor.specialty}</p>
              </div>
              <div className="doctor-card-body">
                <p>
                  <FaPhone /> {doctor.phone}
                </p>
                <p>
                  <FaEnvelope /> {doctor.email}
                </p>
              </div>
              <div className="doctor-card-footer">
                <button
                  className="book-now-button"
                  onClick={() => handleBookNow(doctor)}
                >
                  Book Now
                </button>
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
