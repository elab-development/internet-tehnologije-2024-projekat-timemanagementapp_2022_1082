import React from 'react'

function LeftSidebar() {
  return (
    <div>
        {/* Levi Sidebar */}
        <div className="w-64 border-r-2 border-black flex flex-col">
        {/* User Avatar Section */}
        <div className="p-4 border-b-2 border-black">
            <div className="w-20 h-20 rounded-full border-2 border-black flex items-center justify-center mx-auto mb-2">
            <span className="text-sm font-medium">Slika</span>
            </div>
        </div>

        {/* Info o useru */}
        <div className="border-b-2 border-black p-4">
            <div className="border-2 border-black p-6 text-center">
            <span className="text-sm font-medium">INFO O USERU</span>
            </div>
        </div>

        {/* Vreme datum*/}
        <div className="border-b-2 border-black p-4">
            <div className="border-2 border-black p-6 text-center">
            <span className="text-sm font-medium">VREME DATUM</span>
            </div>
        </div>

        {/* Logout i opcije */}
        <div className="p-4">
            <div className="border-2 border-black p-6 text-center">
            <span className="text-sm font-medium">LOGOUT I OPCIJE</span>
            </div>
        </div>
        </div>
    </div>
  )
}

export default LeftSidebar;
