import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './SideNavBar';
import { PlusIcon } from '@heroicons/react/solid';

const Modal = ({ isOpen, onClose, title, children, showAddButton, onAddNew }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          {showAddButton && (
            <button
              className="text-white bg-green-500 p-2 rounded-full hover:bg-green-600 focus:outline-none"
              onClick={onAddNew}
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">{children}</div>
        <button
          className="mt-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const FormPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [qualification, setQualifications] = useState([]);
  const [stream, setStreams] = useState([]);
  const [location, setJobLocations] = useState([]);
  const [industryType, setIndustryTypes] = useState([]);
  const [areaofwork, setWorkAreas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [message, setMessage] = useState('');

  const fetchData = async (endpoint, setData) => {
    try {
      const response = await axios.get(`/api/${endpoint}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Error fetching data');
    }
  };

  const addNewData = async (endpoint, newData, setDataFunction) => {
    try {
      const response = await axios.post(`/api/${endpoint}`, newData);
      setDataFunction((prevData) => [...prevData, response.data]);
      setMessage('Data inserted successfully');
    } catch (error) {
      console.error('Error adding data:', error.response ? error.response.data : error.message);
      setMessage('Error inserting data');
    }
  };

  const handleAddNew = (title) => {
    setModalTitle(`Add new ${title}`);
    setIsAddNewModalOpen(true);
    setMessage('');
  };

  const handleNewDataSubmit = () => {
    let newData;
    switch (modalTitle) {
      case 'Add new Qualifications':
        newData = { qualification: newItem };
        addNewData('qualification', newData, setQualifications);
        break;
      case 'Add new Stream':
        newData = { stream: newItem };
        addNewData('stream', newData, setStreams);
        break;
      case 'Add new Job Location':
        newData = { location: newItem };
        addNewData('location', newData, setJobLocations);
        break;
      case 'Add new Industry Type':
        newData = { industryType: newItem };
        addNewData('industryType', newData, setIndustryTypes);
        break;
        case 'Add new Area of Work':
          newData = { areaofWork: newItem }; // updated field name to match backend
          addNewData('areaofwork', newData, setWorkAreas);
          break;
        
      default:
        break;
    }
    setIsAddNewModalOpen(false);
    setNewItem('');
  };

  const handleCardOpen = async (title) => {
    setModalTitle(title);
    setMessage('');
    switch (title) {
      case 'qualification':
        await fetchData('qualification', setQualifications);
        setModalContent(qualification);
        break;
      case 'stream':
        await fetchData('stream', setStreams);
        setModalContent(stream);
        break;
      case 'location':
        await fetchData('location', setJobLocations);
        setModalContent(location);
        break;
      case 'industryType':
        await fetchData('industryType', setIndustryTypes);
        setModalContent(industryType);
        break;
      case 'areaOfWork':
        await fetchData('areaofwork', setWorkAreas);
        setModalContent(areaofwork);
        break;
      default:
        break;
    }
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
    setModalContent([]);
    setMessage('');
  };
  

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="p-8 w-full">
        <h1 className="text-3xl font-bold mb-6">Job Information Form</h1>
        {message && <div className="mb-4 text-green-500">{message}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Qualifications', 'Stream', 'Job Location', 'Industry Type', 'Area of Work'].map((item) => (
            <div key={item} className="border border-gray-200 rounded-lg p-4 shadow-md w-full my-2">
              <h3 className="text-xl font-semibold mb-2">{item}</h3>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                onClick={() => handleCardOpen(item)}
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        showAddButton={true}
        onAddNew={() => handleAddNew(modalTitle)}
      >
        {modalContent && modalContent.length > 0 ? (
          <ul className="list-disc pl-5">
            {modalContent.map((item, index) => (
              <li key={index}>{item.qualification || item.stream || item.location || item.industryType || item.areaOfWork}</li>
            ))}
          </ul>
        ) : (
          <p>No data available.</p>
        )}
      </Modal>

      <Modal
        isOpen={isAddNewModalOpen}
        onClose={() => setIsAddNewModalOpen(false)}
        title={modalTitle}
      >
        <input
          type="text"
          placeholder="Enter new item"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={handleNewDataSubmit}
        >
          Add
        </button>
      </Modal>
    </div>
  );
};

export default FormPage;
