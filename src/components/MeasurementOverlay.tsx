import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, X, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MeasurementOverlayProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const MeasurementOverlay: React.FC<MeasurementOverlayProps> = ({ isVisible, onToggle }) => {
  const [measurements, setMeasurements] = useState<{ x: number; y: number; label: string }[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Add some default measurement points
      setMeasurements([
        { x: 10, y: 20, label: 'Title Area' },
        { x: 50, y: 30, label: '3D Model Center' },
        { x: 90, y: 80, label: 'CTA Buttons' },
        { x: 25, y: 60, label: 'Subtitle' },
        { x: 75, y: 15, label: 'Navigation' }
      ]);
    }
  }, [isVisible]);

  const handleClick = (e: React.MouseEvent) => {
    if (isAdding && isVisible) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      const label = prompt('Enter label for this point:') || `Point ${measurements.length + 1}`;
      setMeasurements([...measurements, { x, y, label }]);
      setIsAdding(false);
    }
  };

  const removeMeasurement = (index: number) => {
    setMeasurements(measurements.filter((_, i) => i !== index));
  };

  if (!isVisible) {
    console.log('MeasurementOverlay: Not visible');
    return null;
  }
  
  console.log('MeasurementOverlay: Rendering with', measurements.length, 'measurements');

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="w-full h-full">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#3b82f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Measurement Points */}
      {measurements.map((measurement, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-auto"
          style={{
            left: `${measurement.x}%`,
            top: `${measurement.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {/* Measurement Point */}
          <div className="relative">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            
            {/* Label */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
              {measurement.label}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-blue-600"></div>
            </div>

            {/* Coordinates */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
              {Math.round(measurement.x)}%, {Math.round(measurement.y)}%
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-gray-800"></div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeMeasurement(index)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        </motion.div>
      ))}

      {/* Add Point Button */}
      <div className="fixed top-4 right-4 flex gap-2">
        <Button
          onClick={() => setIsAdding(!isAdding)}
          variant={isAdding ? "destructive" : "default"}
          size="sm"
          className="pointer-events-auto"
        >
          {isAdding ? <X className="w-4 h-4 mr-2" /> : <Ruler className="w-4 h-4 mr-2" />}
          {isAdding ? 'Cancel' : 'Add Point'}
        </Button>
        
        <Button
          onClick={onToggle}
          variant="outline"
          size="sm"
          className="pointer-events-auto"
        >
          <Grid3X3 className="w-4 h-4 mr-2" />
          Hide Grid
        </Button>
      </div>

      {/* Instructions */}
      {isAdding && (
        <div className="fixed bottom-4 left-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg pointer-events-auto">
          <div className="text-sm font-medium">Click anywhere to add a measurement point</div>
        </div>
      )}

      {/* Click Handler */}
      <div 
        className="absolute inset-0 pointer-events-auto"
        onClick={handleClick}
        style={{ cursor: isAdding ? 'crosshair' : 'default' }}
      />
    </div>
  );
};
