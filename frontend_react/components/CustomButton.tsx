"use client";

import React, { ReactNode } from 'react';

interface CustomButtonProps {
  title: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'primary-dark' | 'secondary-dark' | 'success-dark' | 'danger-dark' | 'warning-dark';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  color = 'primary',
  size = 'medium',
  onClick,
  fullWidth = false,
  disabled = false,
  type = 'button',
  className = '',
  children,
}) => {
  // Mapiranje boja - regularno i za tamnu temu
  const colorClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    
    // Boje za tamnu temu
    'primary-dark': 'bg-blue-700 hover:bg-blue-800 text-white',
    'secondary-dark': 'bg-gray-700 hover:bg-gray-800 text-white',
    'success-dark': 'bg-green-700 hover:bg-green-800 text-white',
    'danger-dark': 'bg-red-700 hover:bg-red-800 text-white',
    'warning-dark': 'bg-yellow-600 hover:bg-yellow-700 text-white'
  };

  // Mapiranje veličina
  const sizeClasses = {
    small: 'py-1 px-3 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg'
  };

  // Sastavljanje klasa
  const buttonClasses = [
    'rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm',
    colorClasses[color],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className
  ].join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children || title}
    </button>
  );
};

export default CustomButton;