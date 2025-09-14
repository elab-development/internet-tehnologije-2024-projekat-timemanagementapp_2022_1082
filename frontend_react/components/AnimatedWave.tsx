import React, { useState, useEffect } from 'react';

interface WavingHandProps {
  wavingSpeed?: number;
  emoji?: string;
  size?: number;
}

const WavingHand: React.FC<WavingHandProps> = ({
  wavingSpeed = 1000,
  emoji = "👋",
  size = 48
}) => {
  const [rotation, setRotation] = useState(0);
  const [direction, setDirection] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => {
        if (prev >= 30) {
          setDirection(-1);
        } else if (prev <= -10) {
          setDirection(1);
        }
        return prev + (5 * direction);
      });
    }, wavingSpeed / 10);
    
    return () => clearInterval(interval);
  }, [direction, wavingSpeed]);
  
  return (
    <div 
      className="flex items-center justify-center p-4"
      style={{
        transform: `rotate(${rotation}deg)`,
        display: 'inline-block',
        fontSize: `${size}px`,
        transition: `transform ${wavingSpeed / 20}ms ease-in-out`
      }}
    >
      {emoji}
    </div>
  );
};

export default WavingHand