import React, { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (!isOpen) return;
    function handleEsc(e) {
      if (e.key === 'Escape') onClose();
    }
    function handleClickOutside(e) {
      if (e.target.classList.contains('sidebar-overlay')) onClose();
    }
    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity" />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-black via-gray-900 to-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl`}
        style={{ minHeight: '100vh' }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className="text-white text-xl font-bold">Menu</span>
          <button onClick={onClose} aria-label="Close sidebar" className="text-gray-300 hover:text-red-500 p-2 rounded-full focus:outline-none">
            <X size={28} />
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <Link href="/" className="text-white py-2 px-3 rounded hover:bg-gray-700 transition">Home</Link>
          <Link href="/marketplace" className="text-white py-2 px-3 rounded hover:bg-gray-700 transition">Marketplace</Link>
          <Link href="/services" className="text-white py-2 px-3 rounded hover:bg-gray-700 transition">Services</Link>
          <Link href="/chats" className="text-white py-2 px-3 rounded hover:bg-gray-700 transition">My Chats</Link>
          <Link href="/user" className="text-white py-2 px-3 rounded hover:bg-gray-700 transition">Profile</Link>
        </nav>
      </div>
    </>
  )
}

export default Sidebar