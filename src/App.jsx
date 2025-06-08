import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/userForm.jsx';
import Completion from './pages/completion.jsx';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UserForm/>} />
      <Route path="/Completion" element={<Completion />} />
    </Routes>
  </Router>
);

export default App;
