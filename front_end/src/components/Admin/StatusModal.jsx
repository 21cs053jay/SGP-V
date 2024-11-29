import React from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const StatusModal = ({ isOpen, type, message }) => {
  const Icon = type === 'success' ? CheckCircle2 : XCircle;
  const gradientClass = type === 'success' 
    ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
    : 'bg-gradient-to-r from-red-500 to-pink-500';

  return (
    <AnimatePresence>
      {isOpen && (
        <AlertDialog open={isOpen}>
          <AlertDialogContent className="relative overflow-hidden border-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-6"
            >
              <AlertDialogHeader>
                <div className={`mx-auto w-16 h-16 rounded-full ${gradientClass} flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <AlertDialogTitle className="text-2xl font-semibold text-center mb-2">
                  {type === 'success' ? 'Success!' : 'Error'}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center text-gray-600">
                  {message}
                </AlertDialogDescription>
              </AlertDialogHeader>
            </motion.div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AnimatePresence>
  );
};

export default StatusModal;