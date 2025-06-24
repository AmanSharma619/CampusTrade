"use client";
import React, { useEffect, useState } from 'react'
import { Defbutton } from '@/components/Button'
import { UseFirebase } from '@/auth/firebase'

const Myservices = () => {
  let firebase = UseFirebase();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchMyServices = async () => {
      try {
       
        const response = await fetch(`/api/myservices?userId=${firebase.user.uid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch your service requests');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching your services:', error);
        setServices([]);
      }
    };
    fetchMyServices();
  }, []);

  return (
    <div className='min-w-screen min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900'>
      <h1 className="text-4xl font-bold text-white text-center mb-10 p-5">Recent Requests</h1>
      <div className="flex flex-wrap justify-center gap-8 px-4 mb-10">
        {services.length === 0 ? (
          <div className="text-white text-lg">No service requests found.</div>
        ) : (
          services.map(req => (
            <div key={req._id} className="bg-white/90 rounded-xl shadow-lg p-5 w-[320px] max-w-full flex flex-col gap-2 border-2 border-indigo-200 hover:scale-105 transition relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-700 font-bold text-base">{req.name}</span>
                <span className="text-xs text-gray-500">{req.date}</span>
              </div>
              <p className="text-gray-800 mb-2">{req.description}</p>
              <span className="text-indigo-700 font-semibold mb-2">Max: {req.maxAmount}</span>
              <button
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow-md hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Delete service request"
                title="Delete"
                onClick={async () => {
                  if(window.confirm('Are you sure you want to delete this service request?')) {
                    try {
                      const res = await fetch(`/api/myservices/?id=${req._id}`, { method: 'DELETE',cache:"no-cache" });
                      if(res.ok) {
                        setServices(services.filter(s => s._id !== req._id));
                      } else {
                        alert('Failed to delete.');
                      }
                    } catch (err) {
                      alert('Error deleting service request.');
                    }
                  }
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Myservices