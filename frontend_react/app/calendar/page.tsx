"use client";

import React, { useState } from 'react';

interface NavLink {
  text: string;
  href: string;
}

const Calendar: React.FC = () => {
  const navLinks: NavLink[] = [
    { text: "Početna", href: "/home" },
    { text: "Kalendar", href: "/calendar" },
    { text: "Zadaci", href: "/tasks" },
    { text: "Analitika", href: "/stats" },
  ];

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Calendar navigation functions
  const prevMonth = (): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = (): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = (): React.ReactNode[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days: React.ReactNode[] = [];
    

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div 
          key={`empty-${i}`} 
          className="h-12 flex text-center items-center justify-center"
        ></div>
      );
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate && 
                          selectedDate.getDate() === day && 
                          selectedDate.getMonth() === month && 
                          selectedDate.getFullYear() === year;
      const isToday = new Date().toDateString() === date.toDateString();
      
      days.push(
        <div 
          key={day} 
          onClick={() => setSelectedDate(date)}
          className={`h-12 aspect-square flex items-center justify-center rounded-full cursor-pointer transition-colors m-1
            ${isSelected ? 'bg-blue-600 text-white font-medium' : 'text-gray-800'}
            ${isToday && !isSelected ? 'border-2 border-blue-600 text-blue-600 font-medium' : ''}
            ${!isToday && !isSelected ? 'hover:bg-blue-500 hover:text-white' : ''}
          `}
        >
          <span className='text-center'>{day}</span>
        </div>
      );
    }
    
    return days;
  };

  const getMonthName = (): string => {
    return currentDate.toLocaleString('sr-Latn', { month: 'long' });
  };

  return (
    <div className='flex min-h-screen rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300'>
      {/* Vertikalni NavBar - leva strana */}
      <aside className="w-54 bg-white shadow-lg rounded-r-2xl">
        <div className="p-6">
          <h1 className="text-2xl text-center font-bold text-blue-600">TimeFlow</h1>
        </div>
        <nav className="mt-6">
          <ul>
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="flex px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded-lg mx-2"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area - right side */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">
        Interaktivni <span className="text-blue-600">Kalendar</span>
        </h2>
        
        {/* Calendar Component */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 w-full max-w-2xl mx-auto">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-6 px-4">
            <button 
              onClick={prevMonth}
              className="w-10 h-10 rounded-full hover:bg-gray-100 text-gray-700 flex items-center justify-center text-xl transition-colors"
            >
              &lt;
            </button>
            <h3 className="text-xl font-medium text-gray-800">
              {getMonthName()} {currentDate.getFullYear()}
            </h3>
            <button 
              onClick={nextMonth}
              className="w-10 h-10 rounded-full hover:bg-gray-100 text-gray-700 flex items-center justify-center text-xl transition-colors"
            >
              &gt;
            </button>
          </div>
          
          <div className="grid grid-cols-7 mb-2 border-b pb-2">
            {['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'].map((day, i) => (
              <div 
                key={i} 
                className="text-center text-sm font-semibold text-gray-600 h-8 flex items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 text-center">
            {generateCalendarDays()}
          </div>
          
          {selectedDate && (
            <div className="mt-2 p-2 border-t border-gray-200 bg-gray-200 rounded-lg">
              <p className="text-sm text-center text-gray-700 font-medium">
                Izabrani datum: <span className="text-blue-600">{selectedDate.toLocaleDateString('sr-Latn')}</span>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Calendar;