import React, { useState } from 'react';
import './LoginPopup.css';


const LoginPopup = ({ setShowLogin, onLoginSuccess }) => {
  const [currState, setCurrState] = useState('Login');
  const [isPanelSelection, setIsPanelSelection] = useState(false);

  const handleLogin = () => {
    onLoginSuccess();
    setIsPanelSelection(true); 
  };

  return (
    <div className='login-popup'>
      <form className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)}  alt="Close" />
        </div>
        <div className='login-popup-inputs'>
          {currState === 'Login' ? null : <input type='name' placeholder='Your Name' required />}
          <input type='email' placeholder='Your Email' required />
          <input type='password' placeholder='Password' required />
        </div>
        <button type="button" onClick={handleLogin}>
          {currState === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>
        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === 'Login'
          ? <p>Create a New Account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
          : <p>Already have an Account? <span onClick={() => setCurrState('Login')}>Login here</span></p>}
      </form>
      {isPanelSelection && (
        <div className='panel-selection'>
          <h2>Select Your Panel</h2>
          <button onClick={() => console.log('Patient Panel Selected')}>Patient Panel</button>
          <button onClick={() => console.log('Doctor Panel Selected')}>Doctor Panel</button>
        </div>
      )}
    </div>
  );
};

export default LoginPopup;
