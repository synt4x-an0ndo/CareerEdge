import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import IndexPage from './pages/IndexPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import CreateCVPage from './pages/CreateCVPage';
import ExtraAddPage from './pages/ExtraAddPage';
import InterviewPage from './pages/InterviewPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/*"
          element={
            <div className="dashboard-container">
              <Sidebar />
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
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
