import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInForm from './SignInForm';
import WelcomePage from './WelcomePage';
import Home from './home';
import TableView from './TableView';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/welcome/:role" element={<WelcomePage />} />
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<TableView />} /> {/* Add this line for TableView */}
      </Routes>
    </Router>
  );
};

export default App;


