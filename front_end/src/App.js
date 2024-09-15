import './App.css';
import Home from './components/home';
import JobApplicationForm from './components/apply_job_form'; 
import AdminHome from './components/Admin/admin_home';
import AdminLogin from './components/Admin/AdminLogin';
import JobPosting from './components/Admin/JobPosting';
import { AuthProvider } from './components/Admin/AuthContext'; 
import ProtectedRoute from './components/Admin/ProtectedRoutes'; 
import JobTable from './components/browse_job';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChangePassword from './components/Admin/changepassword';

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/SubmitCV" element={<JobApplicationForm />} />
            <Route path="/Browsejobs" element={<JobTable />} />

            <Route path="*" element={<Navigate to="/home" />} />

            {/* Admin Login Route */}
            <Route path="/admin" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route 
              path="/admin_home" 
              element={
                <ProtectedRoute>
                  <AdminHome />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/JobPosting" 
              element={
                <ProtectedRoute>
                  <JobPosting />
                </ProtectedRoute>
              } 
            />
             <Route 
              path="admin/changepassword" 
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
