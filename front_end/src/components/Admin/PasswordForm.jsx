import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const PasswordForm = ({
  adminId,
  newPassword,
  confirmPassword,
  showPassword,
  onAdminIdChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
  onSubmit,
}) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
      onSubmit={onSubmit}
    >
      <div className="space-y-2">
        <Label htmlFor="adminId" className="text-sm font-medium text-gray-700">
          Admin ID
        </Label>
        <Input
          type="text"
          id="adminId"
          value={adminId}
          onChange={(e) => onAdminIdChange(e.target.value)}
          className="w-full transition-all duration-200 focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your Admin ID"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
          New Password
        </Label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            id="newPassword"
            value={newPassword}
            onChange={(e) => onNewPasswordChange(e.target.value)}
            className="w-full pr-10 transition-all duration-200 focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your new password"
            required
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            className="w-full pr-10 transition-all duration-200 focus:ring-2 focus:ring-purple-500"
            placeholder="Confirm your new password"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
      >
        Change Password
      </Button>
    </motion.form>
  );
};

export default PasswordForm;