import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import IndexPage from './pages/IndexPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import CreateCVPage from './pages/CreateCVPage';
import ExtraAddPage from './pages/ExtraAddPage';
import InterviewPage from './pages/InterviewPage';
import './App.css';

// Map routes to sidebar labels
const getActivePage = (pathname) => {
  const routeMap = {
    '/dashboard': 'Dashboard',
    '/profile': 'Profile',
    '/create-cv': 'Create CV',
  };
  return routeMap[pathname] || '';
};

const DashboardLayout = () => {
  const location = useLocation();
  const activePage = getActivePage(location.pathname);

  return (
    <div className="dashboard-container">
      <Sidebar activePage={activePage} />
      <main className="main-content">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-cv" element={<CreateCVPage />} />
          <Route path="/extra-add" element={<ExtraAddPage />} />
          <Route path="/interview" element={<InterviewPage />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
