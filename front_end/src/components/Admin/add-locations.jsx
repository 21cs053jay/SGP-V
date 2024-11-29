import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Sidebar from './SideNavBar';
import { PlusIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import indiaStatesCities from './city-state.json';

// Card component for display purposes
const Card = ({ title, onClick, gradient }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`relative overflow-hidden rounded-xl shadow-lg cursor-pointer ${gradient} p-6 h-[160px] flex flex-col justify-between`}
    onClick={onClick}
  >
    <div className="relative z-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <ArrowRightIcon className="w-4 h-4 text-white" />
      </div>
      <button className="mt-4 flex items-center text-white/90 hover:text-white text-sm font-medium group">
        View Details
      </button>
    </div>
  </motion.div>
);

// Modal component for displaying forms and lists
const Modal = ({ isOpen, onClose, title, children, showAddButton, onAddNew }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl shadow-xl w-[600px] max-w-full max-h-[90vh] flex flex-col"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            {showAddButton && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-500 p-2 rounded-full text-white shadow-lg"
                onClick={onAddNew}
              >
                <PlusIcon className="h-5 w-5" />
              </motion.button>
            )}
          </div>
          <div className="p-6 overflow-y-auto flex-1">{children}</div>
          <div className="p-6 border-t border-gray-100">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gray-800 text-white py-3 rounded-xl"
              onClick={onClose}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const FormPage = () => {
  const [modalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const states = Object.keys(indiaStatesCities);

  const fetchData = async (endpoint) => {
    setIsLoading(true);
    try {
      console.log(endpoint)
      const response = await axios.get(`http://localhost:5000/api/jobInfo/${endpoint}`);
      console.log(response.data.data)
      console.log("before",modalData)
      setModalData(response.data.data);
      console.log("after",modalData)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch data');
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewData = async (endpoint, newData) => {
    setIsLoading(true);
    try {
      console.log(endpoint)
      console.log(newData)
      const response = await axios.post(`http://localhost:5000/api/jobInfo/${endpoint}`, newData);
      setModalData((prev) => [...prev, response.data.data]);
      toast.success('Added successfully!');
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add new item');
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsAddNewModalOpen(false);
    setNewItem('');
    setSelectedState('');
    setSelectedCity('');
  };

  const handleCardOpen = (title, endpoint) => {
    setModalTitle(title);
    setIsModalOpen(true);
    fetchData(endpoint);
  };

  const handleAddNew = (title) => {
    setModalTitle(`Add new ${title}`);
    setIsAddNewModalOpen(true);
  };

  const handleNewDataSubmit = () => {
    const title = modalTitle.replace('Add new ', '');
    if (title === 'Job Location') {
      if (!selectedState || !selectedCity) {
        toast.error('Please select both state and city');
        return;
      }
      addNewData('location', { state: selectedState, city: selectedCity });
    } else {
      if (!newItem.trim()) {
        toast.error('Please enter a value');
        return;
      }
      console.log(`here ${title.replace(/\s/g,'').toLowerCase()}`)
      addNewData(title.replace(/\s/g,'').toLowerCase().trim(), { [title.replace(/\s/g,'').toLowerCase().trim()]: newItem });
    }
  };

  const cards = [
    { title: 'Qualifications', gradient: 'bg-gradient-to-br from-blue-500 to-blue-600', endpoint: 'qualification' },
    { title: 'Stream', gradient: 'bg-gradient-to-br from-purple-500 to-purple-600', endpoint: 'stream' },
    { title: 'Job Location', gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600', endpoint: 'location' },
    { title: 'Industry Type', gradient: 'bg-gradient-to-br from-orange-500 to-orange-600', endpoint: 'industrytype' },
    { title: 'Area of Work', gradient: 'bg-gradient-to-br from-pink-500 to-pink-600', endpoint: 'areaofwork' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="ml-[33px] w-[90%] sm:w-[70%] lg:w-[80%] p-8">
        <h1 className="flex-1 text-4xl font-bold mb-8">Job Info Management</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              gradient={card.gradient}
              onClick={() => handleCardOpen(card.title, card.endpoint)}
            />
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setError(null);
          }}
          title={modalTitle}
          showAddButton={true}
          onAddNew={() => handleAddNew(modalTitle)}
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div>
              {modalData.map((item, index) => (
  <motion.div key={index} className="bg-gray-50 p-4 rounded-lg">
    {/* Render Qualification if it exists */}
    {item.qualification && (
      <div>{item.qualification}</div>
    )}

    {/* Render Stream if it exists */}
    {item.stream && (
      <div>{item.stream}</div>
    )}

    {/* Render Location (state and city) if they both exist */}
    {item.state && item.city && (
      <div>{`${item.state}, ${item.city}`}</div>
    )}

    {/* Render Industry Type if it exists */}
    {item.industrytype && (
      <div>{item.industrytype}</div>
    )}

    {/* Render Area of Work if it exists */}
    {item.areaofwork && (
      <div>{item.areaofwork}</div>
    )}
  </motion.div>
))}

            </div>
          )}
        </Modal>

        <Modal isOpen={isAddNewModalOpen} onClose={resetForm} title={modalTitle}>
          {modalTitle === 'Add new Job Location' ? (
            <>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 mt-4 rounded-lg border"
              >
                <option value="">Select City</option>
                {indiaStatesCities[selectedState]?.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={`Enter ${modalTitle.replace('Add new ', '')}`}
              className="w-full px-4 py-2 mt-4 rounded-lg border"
            />
          )}
          <motion.button
            onClick={handleNewDataSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gray-800 text-white py-3 rounded-xl mt-4"
          >
            Add New
          </motion.button>
        </Modal>
        <ToastContainer />
      </div>
    </div>
  );
};

export default FormPage;
