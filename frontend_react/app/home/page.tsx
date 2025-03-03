"use client";

import React from 'react';
import IconCard from '../../components/IconCard';


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
    { text: "Početna", href: "/" },
    { text: "Dashboard", href: "/dashboard" },
    { text: "Zadaci", href: "/tasks" },
    { text: "Kalendar", href: "/calendar" },
    { text: "Statistika", href: "/stats" },
    { text: "Podešavanja", href: "/settings" }
  ];

  return (
    <div className="flex min-h-screen rounded-2xl bg-gray-50">
      {/* Vertikalni NavBar - leva strana */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl text-center font-bold text-blue-600">TimeFlow</h1>
        </div>
        <nav className="mt-6">
          <ul>
            {navLinks.map((link, index) => (
              <li key={index} >
                <a 
                  href={link.href} 
                  className="flex px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
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
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Dobrodošo/la u TimeFlow</h2>
        
        {/* Horizontalni containeri za statistiku */}
        <div className="bg-[#785aff] p-4 rounded-2xl mb-4">
            <div className="flex gap-6 justify-center items-center">
                {/* Završeni zadaci */}
                <div className="flex flex-col bg-white rounded-lg p-6">
                    <h3 className="text-lg font-medium text-center text-gray-900 mb-3">Završeni zadaci</h3>
                    <div className="w-full bg-gray-200 rounded-full h-4.5">
                        <div className="bg-green-500 h-4.5 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                    <p className="mt-3 text-2xl text-center font-semibold text-gray-800">11 Zadataka</p>
                </div>

                {/* Ukupno zadataka */}
                <div className="flex flex-col bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-medium text-center text-gray-900 mb-3">Ukupno zadataka</h3>
                    <p className="mt-2 text-2xl text-center font-semibold text-gray-800">23 Zadataka</p>
                </div>

                {/* Produktivnost */}
                <div className="flex flex-col bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-medium text-center text-gray-900 mb-3">Produktivnost</h3>
                    <div className="w-full bg-gray-200 rounded-full h-4.5">
                        <div className="bg-blue-600 h-4.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <p className="mt-3 text-2xl text-center font-semibold text-gray-800">76% - 79%</p>
                </div>
            </div>
        </div>


        
        {/* Prva grupa kartica - korišćenje Card komponente */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <IconCard
            icon={<CalendarIcon />}
            title="Planiranje"
            text="Efikasno planirajte svoje vreme i zadatke u intuitivnom kalendaru"
            className="text-center"
          />
          
          <IconCard
            icon={<ClockIcon />}
            title="Praćenje vremena"
            text="Pratite kako trošite svoje vreme i optimizujte svoju produktivnost"
            className="text-center"
          />
          
          <IconCard
            icon={<ChartIcon />}
            title="Analitika"
            text="Dobijte detaljan uvid u svoju produktivnost kroz grafikone i izveštaje"
            className="text-center"
          />
        </div>
        
        {/* Druga grupa kartica - korišćenje Card komponente */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <IconCard
            icon={<NotesIcon />}
            title="Beleške"
            text="Organizujte svoje beleške i ideje na jednom mestu"
            className="text-center"
          />
          
          <IconCard
            icon={<TeamIcon />}
            title="Saradnja"
            text="Delite zadatke i sarađujte sa članovima vašeg tima"
            className="text-center"
          />
          
          <IconCard
            icon={<ReportIcon />}
            title="Izveštaji"
            text="Kreirajte detaljne izveštaje o vašoj produktivnosti i napretku"
            className="text-center"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;