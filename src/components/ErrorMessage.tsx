import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center space-x-2">
      <AlertTriangle size={20} className="text-red-500" />
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;