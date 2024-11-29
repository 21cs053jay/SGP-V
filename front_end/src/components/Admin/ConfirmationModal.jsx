// import React from 'react';

// const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
//   if (!isOpen) return null;

//   // Determine if we should show buttons based on the message content
//   const showButtons = !message.toLowerCase().includes('successfully');

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-md">
//         <h3 className="text-black font-semibold mb-4 text-center">{message}</h3>
        
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationModal;


import React from 'react';
import { motion } from 'framer-motion';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;
  const showButtons = !message.toLowerCase().includes('successfully');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay with blur */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      
      {/* Modal content with white background */}
      <motion.div
        className="relative bg-white rounded-lg shadow-lg p-6 z-50 max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <h2 className="text-lg font-semibold mb-4">{message}</h2>
        <div className={`flex justify-center space-x-4 ${showButtons ? 'block' : 'hidden'}`}>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;