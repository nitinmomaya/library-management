import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
// import { HomePage } from '../pages/HomePage';
import { AuthenticatedRoute, ProtectedRoute } from './ProtectedRoute';
import Home from '../pages/Home';
import HomePage from '../pages/HomePage';
import Borrow from '../pages/Borrow';
 
export const AppRoutes = () => (
  
  <Routes>
   <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<AuthenticatedRoute />}>
      <Route path="/" element={<Home />}>
        <Route path="home" element={<HomePage />} />
        <Route path='my-borrow-book' element={<div>borrow1</div>}/>
      </Route>
    </Route>
    <Route  element={<ProtectedRoute/>}>
      <Route path="/" element={<Home />}>
        <Route path='borrow-book' element={<Borrow/>}/>
      </Route>
    </Route>
  </Routes>
);