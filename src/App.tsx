import React from 'react';
// import AppRoutes from './routes/Routes';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';

const App: React.FC = () => {
  // return <AppRoutes />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;