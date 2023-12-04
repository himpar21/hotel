// SignUpForm.js
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SignUpContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SignUpHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  box-sizing: border-box;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  box-sizing: border-box;
`;

const SignUpButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
`;

const SuccessMessage = styled.p`
  color: green;
  text-align: center;
  font-weight: bold;
`;

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async () => {
    try {
      // Basic input validations
      if (!name || !email || !phone || !username || !password || !confirmPassword || !role) {
        setError('All fields are required.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Invalid email format.');
        return;
      }

      // Phone number validation (allow only digits and '+' sign)
      const phoneRegex = /^[0-9+]+$/;
      if (!phoneRegex.test(phone)) {
        setError('Invalid phone number format.');
        return;
      }

      // Password strength (minimum length of 6 characters)
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }

      // Additional validations can be added

      const response = await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        phone,
        username,
        password,
        role,
      });

      console.log(response.data);
      setSuccessMessage('User registered successfully');
    } catch (error) {
      console.error(error.response.data);
      setSuccessMessage('');
    }
  };

  return (
    <SignUpContainer>
      <SignUpHeader>Sign Up</SignUpHeader>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      <FormLabel>
        Name:
        <FormInput type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </FormLabel>
      <FormLabel>
        Email:
        <FormInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormLabel>
      <FormLabel>
        Phone:
        <FormInput type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </FormLabel>
      <FormLabel>
        Username:
        <FormInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </FormLabel>
      <FormLabel>
        Password:
        <FormInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormLabel>
      <FormLabel>
        Confirm Password:
        <FormInput type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </FormLabel>
      <FormLabel>
        Role:
        <FormSelect value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </FormSelect>
      </FormLabel>
      <SignUpButton onClick={handleSignUp}>Sign Up</SignUpButton>
    </SignUpContainer>
  );
};

export default SignUpForm;
