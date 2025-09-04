"use client";

import React, { useState, useEffect } from 'react';
import IconCard from '../../components/IconCard';
import AnimatedWave from '../../components/AnimatedWave';
import Task from '@/components/Task';

const HomePage: React.FC = () => {
  // SVG ikonice
  const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  const NotesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );

  const navLinks = [
    { text: "Početna", href: "/home" },
    { text: "Kalendar", href: "/calendar" },
    { text: "Zadaci", href: "/tasks" },
    { text: "Analitika", href: "/stats" },
  ];

  const [selectedEmoji, setSelectedEmoji] = useState("👋");
  const [selectedSize, setSelectedSize] = useState(28);
  const [selectedSpeed, setSelectedSpeed] = useState(1000);


    const [progress1, setProgress1] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [count, setCount] = useState(0);
  

    useEffect(() => {

      const interval1 = setInterval(() => {
        setProgress1((prev) => (prev < 50 ? prev + 1 : prev));
      }, 30);
  

      const interval2 = setInterval(() => {
        setProgress2((prev) => (prev < 78 ? prev + 1 : prev));
      }, 20);


      const interval3 = setInterval(() => {
        setCount((prev) => (prev < 23 ? prev + 1 : prev));
      }, 80); 
  
      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(interval3);
      };
    }, []);

    return (
        <div className="flex min-h-screen rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300">
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
    
          {/* Glavni sadržaj - desna strana */}
          <main className="flex-1 p-6 pt-2">
            <div className="flex flex-row justify-center items-center space-x-1">
            <h2 className="text-2xl font-semibold text-gray-800">
              Dobrodošo/la u <span className="text-3xl text-blue-600">TimeFlow</span>
            </h2>
              <div className="">
                <AnimatedWave emoji={selectedEmoji} size={selectedSize} wavingSpeed={selectedSpeed} />
              </div>
            </div>
    
            {/* Horizontalni containeri za statistiku */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg mb-6">
              <div className="flex flex-wrap gap-4 justify-center items-stretch">
                {/* Završeni zadaci */}
                <div className="flex flex-col bg-white rounded-xl p-6 shadow-md flex-1 min-w-64 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105">
                  <h3 className="text-md font-semibold text-center text-gray-800 mb-4">Završeni zadaci</h3>
                  <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${progress1}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">0%</span>
                    <span className="text-xs text-gray-500">100%</span>
                  </div>
                  <p className="mt-4 text-xl text-center font-bold text-gray-800">11 Zadataka</p>
                </div>
    
                {/* Ukupno zadataka */}
                <div className="flex flex-col bg-white rounded-xl p-6 shadow-md flex-1 min-w-64 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-16 h-16 bg-blue-100 rounded-full opacity-20"></div>
                  <h3 className="text-md font-semibold text-center text-gray-800 mb-2">Ukupno zadataka</h3>
                  <div className="flex justify-center items-center flex-grow">
                    <p className="text-4xl font-bold text-blue-600">{count}</p>
                  </div>
                  <p className="text-center text-gray-600 mt-2">Zadataka ukupno</p>
                </div>
    
                {/* Produktivnost */}
                <div className="flex flex-col bg-white rounded-xl p-4 shadow-md flex-1 min-w-64 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105">
                    <h3 className="text-md font-semibold text-center text-gray-800 mb-2">Produktivnost</h3>
                    <div className="relative pt-1">
                        <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                        <div
                            className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500 ease-in-out"
                            style={{ width: `${progress2}%` }}
                        ></div>
                        </div>
                        <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">0%</span>
                        <span className="text-xs text-gray-500">100%</span>
                        </div>
                    </div>
                    <p className="mt-2 text-xl text-center font-bold text-gray-800">76% - 79%</p>
                    <p className="text-center text-green-500 text-xs mt-1">+2.3% od prošle nedelje</p>
                    </div>
              </div>
            </div>
    
            <div className="flex flex-col md:flex-row gap-6 mb-2">
          {/* Leva strana */}
              <div className="grid grid-rows-1 md:grid-rows-2 gap-6 max-w-[260px] max-h-[400px]">
                  <IconCard
                  icon={<CalendarIcon />}
                  title="Kalendar"
                  text="Efikasno planirajte svoje vreme i zadatke u intuitivnom kalendaru"
                  className="text-center hover:transform hover:scale-105 transition-transform duration-300"
                  />
                  <IconCard
                  icon={<NotesIcon />}
                  title="TODO Lista"
                  text="Organizujte svoje zadatke i ideje na jednom mestu."
                  className="text-center hover:transform hover:scale-105 transition-transform duration-300"
                  />
              </div>

            {/* Desna strana */}
              <div className="bg-white rounded-xl shadow-lg p-4 flex-1">
                  <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Brza Lista Zadataka</h2>
                  <div className="space-y-4 flex-col">
                      <Task
                      title="Zadatak 1: Planiranje sastanka"
                      description="Organizujte sastanak sa timom za sledeću nedelju."
                      status="u toku"
                      onComplete={() => alert('Task 1 označen kao završen!')}
                      />
                      <Task
                      title="Zadatak 2: Priprema izveštaja"
                      description="Pripremite kvartalni izveštaj za menadžment."
                      status="završeno"
                      />
                  </div>
              </div>
          </div>

          </main>
        </div>
      );
};

export default HomePage;