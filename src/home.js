// Home.js
import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

const Home = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowSignIn(false);
  };

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', height: '100vh' }}>
      {/* <h2 style={{ color: '#333' }}>Welcome</h2> */}
      <div>
        <button
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            margin: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s',
          }}
          onClick={handleSignUpClick}
        >
          Sign Up
        </button>
        <button
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            margin: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s',
          }}
          onClick={handleSignInClick}
        >
          Sign In
        </button>
      </div>

      {showSignUp && <SignUpForm />}
      {showSignIn && <SignInForm />}
    </div>
  );
};

export default Home;
