import './App.css';
import Home from './components/home';
import JobApplicationForm from './components/apply_job_form'; 
import AdminHome from './components/Admin/admin_home';
import AdminLogin from './components/Admin/AdminLogin';
import JobPosting from './components/Admin/JobPosting';
import { AuthProvider } from './components/Admin/AuthContext'; 
import ProtectedRoute from './components/Admin/ProtectedRoutes'; 
import CvAgainstJob from './components/Admin/cvagainstjob';
import JobTable from './components/browse_job';
import CreateRePresentative from './components/Admin/create-rp';
import JobList from './components/Admin/recent-jobs';
import AdminPanel from './components/Admin/add-locations';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChangePassword from './components/Admin/changepassword';
import SubmitCV from './components/submit_cv';


const App = () => {
  return (
     <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/SubmitCV" element={<SubmitCV />} />
            <Route path="/SubmitCV/:jid" element={<JobApplicationForm />} />
            <Route path="/Browsejobs" element={<JobTable />} />
            <Route path="/Browsejobs/:homeSearch" element={<JobTable />} />

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
            <Route 
              path="/admin/cvagainstjob" 
              element={
                <ProtectedRoute>
                  <CvAgainstJob/>
                </ProtectedRoute>
              } 
            />
             <Route 
              path="/admin/create-representative" 
              element={
                <ProtectedRoute>
                  <CreateRePresentative/>
                </ProtectedRoute>
              } 
            />
           <Route 
              path="/admin/recent-posted-jobs" 
              element={
                <ProtectedRoute>
                  <JobList/>
                </ProtectedRoute>
              } 
            />
             <Route 
              path="/admin/job-locations" 
              element={
                <ProtectedRoute>
                  <AdminPanel/>
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
