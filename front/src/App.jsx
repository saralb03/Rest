import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MyRoute } from './components/MyRoute';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <Header/>
      <MyRoute />
    </Router>
  );
};

export default App;
