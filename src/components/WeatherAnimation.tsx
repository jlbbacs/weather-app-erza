import React, { useEffect, useState } from 'react';

interface WeatherAnimationProps {
  weatherIcon: string;
}

const WeatherAnimation: React.FC<WeatherAnimationProps> = ({ weatherIcon }) => {
  const [elements, setElements] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    const generateElements = () => {
      const code = weatherIcon.substring(0, 2);
      
      // Clear the previous elements
      setElements([]);
      
      // Generate new elements based on the weather
      let newElements: JSX.Element[] = [];
      
      if (code === '09' || code === '10') {
        // Rain
        newElements = Array.from({ length: 20 }, (_, i) => (
          <div 
            key={i}
            className="absolute animate-rainDrop bg-blue-300 opacity-70 w-0.5 h-8"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}px`,
              animationDuration: `${0.5 + Math.random() * 1.5}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ));
      } else if (code === '13') {
        // Snow
        newElements = Array.from({ length: 30 }, (_, i) => (
          <div 
            key={i}
            className="absolute animate-snowfall bg-white rounded-full opacity-80"
            style={{
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}px`,
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ));
      } else if (code === '11') {
        // Thunderstorm - lightning flashes
        newElements = Array.from({ length: 3 }, (_, i) => (
          <div 
            key={i}
            className="absolute inset-0 animate-lightning bg-yellow-200 opacity-0"
            style={{
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 8}s`
            }}
          />
        ));
      } else if (code === '50') {
        // Mist/Fog
        newElements = Array.from({ length: 15 }, (_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white opacity-30 animate-fogMove"
            style={{
              width: `${30 + Math.random() * 100}px`,
              height: `${30 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${15 + Math.random() * 25}s`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ));
      }
      
      setElements(newElements);
    };
    
    generateElements();
  }, [weatherIcon]);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements}
    </div>
  );
};

export default WeatherAnimation;