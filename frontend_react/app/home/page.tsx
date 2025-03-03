"use client";

import React, { useState, useEffect } from 'react';
import IconCard from '../../components/IconCard';
import AnimatedWave from '../../components/AnimatedWave';

const Home: React.FC = () => {
  // SVG ikonice
  const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  const ChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-2">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
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

  const TeamIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  const ReportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  );

  // Linkovi za vertikalnu navigaciju
  const navLinks = [
    { text: "Početna", href: "/home" },
    { text: "Zadaci", href: "/tasks" },
    { text: "Kalendar", href: "/calendar" },
    { text: "Analitika", href: "/stats" },
  ];

  const [selectedEmoji, setSelectedEmoji] = useState("👋");
  const [selectedSize, setSelectedSize] = useState(28);
  const [selectedSpeed, setSelectedSpeed] = useState(1000);

    // Stanja za animaciju
    const [progress1, setProgress1] = useState(0); // Završeni zadaci (0% do 50%)
    const [progress2, setProgress2] = useState(0); // Produktivnost (0% do 78%)
    const [count, setCount] = useState(0); // Brojač od 0 do 23
  
    // Efekti za animaciju
    useEffect(() => {
      // Animacija za prvi loader (Završeni zadaci)
      const interval1 = setInterval(() => {
        setProgress1((prev) => (prev < 50 ? prev + 1 : prev));
      }, 30); // Brzina animacije
  
      // Animacija za drugi loader (Produktivnost)
      const interval2 = setInterval(() => {
        setProgress2((prev) => (prev < 78 ? prev + 1 : prev));
      }, 20); // Brzina animacije
  
      // Animacija za brojač (0 do 23)
      const interval3 = setInterval(() => {
        setCount((prev) => (prev < 23 ? prev + 1 : prev));
      }, 80); // Brzina animacije
  
      // Čišćenje intervala
      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(interval3);
      };
    }, []);

    return (
        <div className="flex min-h-screen rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Vertikalni NavBar - leva strana */}
          <aside className="w-64 bg-white shadow-lg rounded-r-2xl">
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
          <main className="flex-1 p-8">
            <div className="flex flex-row justify-center items-center space-x-1">
              <h2 className="text-2xl font-semibold text-gray-800">Dobrodošo/la [Ime korisnika]</h2>
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
                        <span className="text-xs text-gray-500">78%</span>
                        <span className="text-xs text-gray-500">100%</span>
                        </div>
                    </div>
                    <p className="mt-2 text-xl text-center font-bold text-gray-800">76% - 79%</p>
                    <p className="text-center text-green-500 text-xs mt-1">+2.3% od prošle nedelje</p>
                    </div>
              </div>
            </div>
    
            {/* Prva grupa kartica - korišćenje Card komponente */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <IconCard
                icon={<CalendarIcon />}
                title="Planiranje"
                text="Efikasno planirajte svoje vreme i zadatke u intuitivnom kalendaru"
                className="text-center hover:transform hover:scale-105 transition-transform duration-300"
              />
{/*     
              <IconCard
                icon={<ClockIcon />}
                title="Praćenje vremena"
                text="Pratite kako trošite svoje vreme i optimizujte svoju produktivnost"
                className="text-center hover:transform hover:scale-105 transition-transform duration-300"
              />
    
              <IconCard
                icon={<ChartIcon />}
                title="Analitika"
                text="Dobijte detaljan uvid u svoju produktivnost kroz grafikone i izveštaje"
                className="text-center hover:transform hover:scale-105 transition-transform duration-300"
              /> */}
            </div>
    
            {/* Druga grupa kartica - korišćenje Card komponente */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <IconCard
                icon={<NotesIcon />}
                title="Beleške"
                text="Organizujte svoje beleške i ideje na jednom mestu"
                className="text-center hover:transform hover:scale-105 transition-transform duration-300"
              />
              {/* <IconCard
                icon={<TeamIcon />}
                title="Saradnja"
                text="Delite zadatke i sarađujte sa članovima vašeg tima"
                className="text-center hover:transform hover:scale-105 transition-transform duration-300"
              />
    
              <IconCard
                icon={<ReportIcon />}
                title="Izveštaji"
                text="Kreirajte detaljne izveštaje o vašoj produktivnosti i napretku"
                className="text-center hover:transform hover:scale-105 transition-transform duration-300"
              /> */}
            </div>

          </main>
        </div>
      );
};

export default Home;