"use client";

import React, { useState } from 'react';

interface NavLink {
  text: string;
  href: string;
}


const Stats: React.FC = () => {

    const navLinks: NavLink[] = [
        { text: "Početna", href: "/home" },
        { text: "Kalendar", href: "/calendar" },
        { text: "Zadaci", href: "/tasks" },
        { text: "Analitika", href: "/stats" },
      ];
      
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

            <div className="flex-1 flex items-center justify-center p-8">
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl">
                    <h2 className="text-3xl font-bold text-red-800 mb-4">Stranica trenutno nije u funkciji.</h2>
                    <p className="text-xl text-gray-600 mb-6">Coming Soon...</p>
                </div>
            </div>
        </div>
    )
}

export default Stats;