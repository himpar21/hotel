// // SignInForm.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';

// const SignInContainer = styled.div`
//   max-width: 400px;
//   margin: auto;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   margin-top: 20px;
// `;

// const SignInHeader = styled.h2`
//   text-align: center;
//   margin-bottom: 20px;
// `;

// const FormLabel = styled.label`
//   display: block;
//   margin-bottom: 10px;
// `;

// const FormInput = styled.input`
//   width: 100%;
//   padding: 8px;
//   margin-bottom: 15px;
//   box-sizing: border-box;
// `;

// const SignInButton = styled.button`
//   background-color: #4caf50;
//   color: white;
//   padding: 10px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   width: 100%;
// `;

// const SignInForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSignIn = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/signin', {
//         username,
//         password,
//       });

//       console.log(response.data);
//       setSuccessMessage('Sign in successful');
//       setErrorMessage('');
//     } catch (error) {
//       console.error(error.response.data);
//       setErrorMessage('Invalid username or password');
//       setSuccessMessage('');
//     }
//   };

//   return (
//     <SignInContainer>
//       <SignInHeader>Sign In</SignInHeader>
//       {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
//       {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
//       <FormLabel>
//         Username:
//         <FormInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//       </FormLabel>
//       <FormLabel>
//         Password:
//         <FormInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </FormLabel>
//       <SignInButton onClick={handleSignIn}>Sign In</SignInButton>
//     </SignInContainer>
//   );
// };

// export default SignInForm;


// SignInForm.js
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SignInContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const SignInHeader = styled.h2`
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

const SignInButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
`;

const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Import useNavigate from react-router-dom

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/signin', {
        username,
        password,
      });

      // Assuming the API returns a user object with a 'role' property
      const { role } = response.data;

      // Navigate to the welcome page and pass the role as a parameter
      navigate(`/welcome/${role}`);

      setSuccessMessage('Sign in successful');
      setErrorMessage('');
    } catch (error) {
      console.error(error.response.data);
      setErrorMessage('Invalid username or password');
      setSuccessMessage('');
    }
  };

  return (
    <SignInContainer>
      <SignInHeader>Sign In</SignInHeader>
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
      <FormLabel>
        Username:
        <FormInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </FormLabel>
      <FormLabel>
        Password:
        <FormInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormLabel>
      <SignInButton onClick={handleSignIn}>Sign In</SignInButton>
    </SignInContainer>
  );
};

export default SignInForm;
