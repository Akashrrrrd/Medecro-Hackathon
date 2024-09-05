import React, { useState } from 'react';
import './Telemedicine.css';
import { FaVideo, FaPhoneAlt, FaEnvelope, FaUser } from 'react-icons/fa';
import DailyIframe from '@daily-co/daily-js';

// Replace with your Daily.co Room URL or a function to create a room
const ROOM_URL = 'https://your-domain.daily.co/room';

const Telemedicine = () => {
    const [call, setCall] = useState(null);

    const handleVideoCall = async () => {
        try {
            const callObject = DailyIframe.createFrame();
            setCall(callObject);
            await callObject.join({ url: ROOM_URL });
            // Add the video frame to the DOM
            callObject.on('joinedMeeting', () => {
                document.body.appendChild(callObject.el());
            });
            // Handle events like call end
            callObject.on('leftMeeting', () => {
                document.body.removeChild(callObject.el());
            });
        } catch (error) {
            alert('Error starting video call: ' + error.message);
        }
    };

    const handleVoiceCall = () => {
        alert('Voice call functionality is not yet implemented.');
    };

    const handleSendMessage = () => {
        alert('Message functionality is not yet implemented.');
    };

    return (
        <div className="telemedicine">
            <header className="telemedicine-header">
                <h1>Telemedicine</h1>
                <p>Manage virtual consultations efficiently with our integrated tools.</p>
            </header>
            <div className="telemedicine-content">
                <div className="telemedicine-actions">
                    <div className="action-card animate-card">
                        <FaVideo className="action-icon" />
                        <h2>Start Video Call</h2>
                        <p>Begin a live video consultation with your patients seamlessly.</p>
                        <button className="action-button" onClick={handleVideoCall}>Start Call</button>
                    </div>
                    <div className="action-card animate-card">
                        <FaPhoneAlt className="action-icon" />
                        <h2>Start Voice Call</h2>
                        <p>Initiate a voice call for quick and effective consultations.</p>
                        <button className="action-button" onClick={handleVoiceCall}>Start Call</button>
                    </div>
                    <div className="action-card animate-card">
                        <FaEnvelope className="action-icon" />
                        <h2>Send Messages</h2>
                        <p>Communicate with patients securely through our messaging system.</p>
                        <button className="action-button" onClick={handleSendMessage}>Send Message</button>
                    </div>
                </div>
                <div className="telemedicine-schedule">
                    <h2>Upcoming Consultations</h2>
                    <ul>
                        <li>
                            <FaUser className="schedule-icon" />
                            <strong>John Doe</strong> - Video Call - <span>Aug 30, 2024, 10:00 AM</span>
                        </li>
                        <li>
                            <FaUser className="schedule-icon" />
                            <strong>Jane Smith</strong> - Voice Call - <span>Aug 30, 2024, 11:00 AM</span>
                        </li>
                        <li>
                            <FaUser className="schedule-icon" />
                            <strong>Emily Johnson</strong> - Message - <span>Aug 31, 2024, 02:00 PM</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Telemedicine;
