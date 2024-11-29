import React, { useState, useEffect } from 'react';
import Sidebar from './SideNavBar';
import { Edit2, Trash2, UserCheck, MailIcon } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RepresentativeCard = ({ rep, onEdit, onDelete }) => {
  return (
    <div className="relative group transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-100/50 via-indigo-200/50 to-purple-200/50 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 relative z-10">
        <div className="flex items-center mb-4">
          <UserCheck className="w-10 h-10 text-indigo-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{rep.name}</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MailIcon className="w-4 h-4 mr-2" />
              <p className="text-sm">{rep.email}</p>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-4">
          <button 
            onClick={() => onEdit(rep._id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors group-hover:opacity-90"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          <button 
            onClick={() => onDelete(rep._id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors group-hover:opacity-90"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const EditRepresentativeModal = ({ rep, onClose, onSubmit }) => {
  const [email, setEmail] = useState(rep.email);
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rep._id, email, password);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Representative</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required 
            />
          </div>
          <div className="flex space-x-4">
            <button 
              type="submit" 
              className="flex-1 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Update
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ManageRepresentatives = () => {
  const [representatives, setRepresentatives] = useState([]);
  const [editingRep, setEditingRep] = useState(null);

  useEffect(() => {
    const fetchRepresentatives = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/handleRepresentative/all');
        const data = await response.json();
        if (response.ok) {
          setRepresentatives(data.representatives);
        } else {
          toast.error('Failed to fetch representatives.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching representatives.');
      }
    };

    fetchRepresentatives();
  }, []);

  const handleEdit = async (id, newEmail, newPassword) => {
    try {
      const response = await fetch(`http://localhost:5000/api/handleRepresentative/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newEmail, password: newPassword }),
      });

      if (response.ok) {
        setRepresentatives((prev) =>
          prev.map((rep) => (rep._id === id ? { ...rep, email: newEmail } : rep))
        );
        setEditingRep(null);
        toast.success('Representative updated successfully.');
      } else {
        toast.error('Failed to update representative.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the representative.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this representative?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/handleRepresentative/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRepresentatives((prev) => prev.filter((rep) => rep._id !== id));
        toast.success('Representative deleted successfully.');
      } else {
        toast.error('Failed to delete representative.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the representative.');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <ToastContainer />
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Manage Representatives</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {representatives.map((rep) => (
              <RepresentativeCard 
                key={rep._id} 
                rep={rep} 
                onEdit={() => setEditingRep(rep)}
                onDelete={handleDelete} 
              />
            ))}
          </div>
        </div>

        {editingRep && (
          <EditRepresentativeModal 
            rep={editingRep} 
            onClose={() => setEditingRep(null)}
            onSubmit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default ManageRepresentatives;