import axios from "axios";
import React, { useState, useEffect } from "react";
import Sidebar from "./SideNavBar";

const AdminPanel = () => {
  const [activeForm, setActiveForm] = useState(""); // Track the active form
  const [data, setData] = useState([]); // Store fetched data
  const [newEntry, setNewEntry] = useState(""); // Store new entry value
  const [showPopup, setShowPopup] = useState(false); // Handle popup display
  const [successMessage, setSuccessMessage] = useState(""); // Success message

  // Mapping for API routes based on form type
  const apiMapping = {
    qualifications: "qualifications",
    streams: "streams",
    joblocations: "joblocations",
    industrytypes: "industrytypes",
    areasofwork: "areasofwork",
  };

  // Fetch data for the selected form
  const fetchData = async (formType) => {
    try {
      const endpoint = apiMapping[formType];
      const response = await axios.get(`/api/${endpoint}`);
      setData(response.data); // Update the data state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle form selection and data fetching
  const handleOpenForm = (formType) => {
    setActiveForm(formType);
    fetchData(formType); // Fetch the data when a form is opened
  };

  // Handle closing popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setNewEntry("");
  };

  // Handle adding a new entry
  const handleAddNewEntry = async (e) => {
    e.preventDefault();
    try {
      const endpoint = apiMapping[activeForm];
      await axios.post(`/api/${endpoint}`, { [activeForm.slice(0, -1)]: newEntry });

      // Fetch updated data after adding
      fetchData(activeForm);

      // Display success message and close the popup after 5 seconds
      setSuccessMessage(`${activeForm.slice(0, -1)} added successfully`);
      setTimeout(() => {
        setSuccessMessage(""); // Clear success message
        handleClosePopup(); // Close popup after success
      }, 5000); // Close popup after 5 seconds
    } catch (error) {
      console.error("Error adding new entry:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white z-10 shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-10 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-8 text-gray-700">Admin Panel: Manage Information</h1>

        {/* Buttons for opening forms */}
        <div className="space-y-4">
          <button
            className="bg-blue-700 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
            onClick={() => handleOpenForm("qualifications")}
          >
            Manage Qualifications
          </button>
          <button
            className="bg-blue-700 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
            onClick={() => handleOpenForm("streams")}
          >
            Manage Streams
          </button>
          <button
            className="bg-blue-700 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
            onClick={() => handleOpenForm("joblocations")}
          >
            Manage Job Locations
          </button>
          <button
            className="bg-blue-700 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
            onClick={() => handleOpenForm("industrytypes")}
          >
            Manage Industry Types
          </button>
          <button
            className="bg-blue-700 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
            onClick={() => handleOpenForm("areasofwork")}
          >
            Manage Areas of Work
          </button>
        </div>

        {/* Display fetched data */}
        {activeForm && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Existing {activeForm.replace("-", " ").toUpperCase()}
            </h2>
            <ul className="bg-white shadow-md p-4 rounded-lg">
              {data.length > 0 ? (
                data.map((entry, index) => (
                  <li key={index} className="mb-2">
                    {entry[activeForm.slice(0, -1)] || entry.name || entry.title}
                  </li>
                ))
              ) : (
                <p>No data found for {activeForm}.</p>
              )}
            </ul>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => setShowPopup(true)}
            >
              Add New {activeForm.replace("-", " ").toUpperCase().slice(0, -1)}
            </button>
          </div>
        )}

        {/* Display success message */}
        {successMessage && (
          <div className="mt-4 bg-green-500 text-white p-4 rounded">
            {successMessage}
          </div>
        )}

        {/* Popup for adding a new entry */}
        {showPopup && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white w-96 p-6 rounded shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Add New {activeForm.replace("-", " ").toUpperCase().slice(0, -1)}
              </h2>
              <form onSubmit={handleAddNewEntry}>
                <label className="block mb-2">
                  {activeForm.replace("-", " ").toUpperCase().slice(0, -1)}:
                </label>
                <input
                  type="text"
                  className="border p-2 w-full mb-4"
                  placeholder={`Enter new ${activeForm.slice(0, -1)}`}
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="ml-4 text-gray-600 px-4 py-2 hover:text-red-600"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
