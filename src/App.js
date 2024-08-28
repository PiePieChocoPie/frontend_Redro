import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './login';
import UserProfilePage from './profile';
import ProductPage from './product';
import Header from './Header'; 
import './App.css';

function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;