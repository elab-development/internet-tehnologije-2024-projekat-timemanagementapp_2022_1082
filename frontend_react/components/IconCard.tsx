"use client";

import React, { ReactNode } from 'react';

interface IconCardProps {
  icon?: ReactNode;
  text: string;
  title?: string;
  className?: string;
  onClick?: () => void;
}

const IconCard: React.FC<IconCardProps> = ({
  icon,
  text,
  title,
  className = '',
  onClick,
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        {icon && (
          <div className="flex-shrink-0 text-blue-600">
            {icon}
          </div>
        )}
        <div>
          {title && <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>}
          <p className="text-gray-600">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default IconCard;