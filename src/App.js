// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Loginform/LoginForm';
import SignupForm from './components/SignUpForm/signUpForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignupForm />} />
      </Routes>
    </Router>
  );
}

export default App;
