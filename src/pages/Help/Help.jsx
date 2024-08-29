import React from 'react';
import './Help.css';

const Help = () => {
    return (
        <div className="help-page">
            <header className="help-header">
                <h1>Help & Support</h1>
                <p>Find answers to your questions or contact support.</p>
            </header>
            <div className="help-content">
                <section className="faqs">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-item">
                        <h3>How do I reset my password?</h3>
                        <p>To reset your password, go to the settings page and click on "Reset Password". Follow the instructions sent to your email.</p>
                    </div>
                    <div className="faq-item">
                        <h3>How do I update my profile information?</h3>
                        <p>To update your profile information, navigate to the profile settings page and edit the details you want to change. Save the changes once you're done.</p>
                    </div>
                    <div className="faq-item">
                        <h3>How can I contact customer support?</h3>
                        <p>You can contact customer support via email at support@smartclinic.com or by phone at (123) 456-7890. Our support team is available 24/7.</p>
                    </div>
                    <div className="faq-item">
                        <h3>What should I do if I encounter a technical issue?</h3>
                        <p>If you encounter a technical issue, please clear your browser cache and restart the application. If the problem persists, contact support for assistance.</p>
                    </div>
                    <div className="faq-item">
                        <h3>How can I provide feedback or suggestions?</h3>
                        <p>We value your feedback! To provide feedback or suggestions, please use the feedback form available on our website or email us directly at feedback@smartclinic.com.</p>
                    </div>
                </section>
                <section className="user-guides">
                    <h2>User Guides</h2>
                    <ul>
                        <li><a href="#">How to use the dashboard</a></li>
                        <li><a href="#">Managing patient records</a></li>
                        <li><a href="#">Scheduling appointments</a></li>
                        <li><a href="#">Generating reports</a></li>
                    </ul>
                </section>
                <section className="contact-support">
                    <h2>Contact Support</h2>
                    <div className="contact-info">
                        <div className="contact-item">
                            <span role="img" aria-label="phone">📞</span>
                            <p>(123) 456-7890</p>
                        </div>
                        <div className="contact-item">
                            <span role="img" aria-label="email">📧</span>
                            <p>support@smartclinic.com</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Help;
