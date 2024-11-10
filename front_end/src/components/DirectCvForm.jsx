// /src/components/DirectCvForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import MyNavbar from "./shared/navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DirectCvForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    qualification: '',
    experience: '',
    presentLocation: '',
    locationPreference: '',
    mobile: '',
    email: '',
    presentDesignation: '',
    presentEmployer: '',
    industryType: '',
    salary: '',
    functionalRole: '',
    cvFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, cvFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post('http://localhost:5000/api/directcv', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Application submitted successfully');
    } catch (error) {
      toast.error('Failed to submit application');
    }
  };

  return (
    <>
      <MyNavbar />
      <div className="flex justify-center mt-8 px-4">
        <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg overflow-y-auto" style={{ maxHeight: '80vh' }}>
          <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Apply Now</h2>
          <p className="text-sm text-gray-600 mb-4 text-center">Fill in the details below that match your resume.</p>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" required />
              </div>
              <div>
                <label className="block text-gray-700">DOB *</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" required />
              </div>
              <div>
                <label className="block text-gray-700">Qualification *</label>
                <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" required />
              </div>
              <div>
                <label className="block text-gray-700">Experience *</label>
                <input type="text" name="experience" value={formData.experience} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Years" required />
              </div>
              <div>
                <label className="block text-gray-700">Present Location *</label>
                <input type="text" name="presentLocation" value={formData.presentLocation} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" required />
              </div>
              <div>
                <label className="block text-gray-700">Location Preference *</label>
                <input type="text" name="locationPreference" value={formData.locationPreference} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" placeholder="e.g., City1, City2" required />
              </div>
              <div>
                <label className="block text-gray-700">Mobile *</label>
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" placeholder="e.g., 1234567890" required />
              </div>
              <div>
                <label className="block text-gray-700">E-Mail *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" required />
              </div>
              <div>
                <label className="block text-gray-700">Present Designation *</label>
                <input type="text" name="presentDesignation" value={formData.presentDesignation} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" required />
              </div>
              <div>
                <label className="block text-gray-700">Present Employer *</label>
                <input type="text" name="presentEmployer" value={formData.presentEmployer} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" required />
              </div>
              <div>
                <label className="block text-gray-700">Type of Industry *</label>
                <input type="text" name="industryType" value={formData.industryType} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" required />
              </div>
              <div>
                <label className="block text-gray-700">Present Salary *</label>
                <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Annual CTC" required />
              </div>
              <div>
                <label className="block text-gray-700">Functional Role *</label>
                <input type="text" name="functionalRole" value={formData.functionalRole} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" required />
              </div>
              <div>
                <label className="block text-gray-700">CV Upload *</label>
                <input type="file" name="cvFile" onChange={handleFileChange} accept=".pdf" className="w-full border border-gray-300 rounded-lg p-2" required />
              </div>
            </div>
            <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out">
              Apply Now
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default DirectCvForm;
