import React from 'react';

interface TemperatureToggleProps {
  unit: 'celsius' | 'fahrenheit';
  onToggle: () => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-gray-200 p-1 rounded-full flex">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            unit === 'celsius' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600'
          }`}
          onClick={unit === 'fahrenheit' ? onToggle : undefined}
        >
          °C
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            unit === 'fahrenheit' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600'
          }`}
          onClick={unit === 'celsius' ? onToggle : undefined}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default TemperatureToggle;