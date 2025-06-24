"use client"
import React, { useEffect, useState } from 'react'
import { Defbutton } from '@/components/Button'
import { UseFirebase } from '@/auth/firebase'
import Link from 'next/link'

const dummyServices = [
  {
    id: 1,
    title: 'Assignment Completion',
    description: 'Get your assignments completed quickly and accurately by experienced peers.',
    price: '₹100 - ₹300 per assignment',
  },
  {
    id: 2,
    title: 'EGL Sheets Drawing',
    description: 'Beautifully hand-drawn EGL sheets for your lab records and submissions.',
    price: '₹50 per sheet',
  },
  {
    id: 3,
    title: 'Lab File Writing',
    description: 'Complete lab records written and formatted as per college standards.',
    price: '₹150 per record',
  },
]

const dummyRequests = [
  {
    id: 1,
    name: 'Riya Sharma',
    description: 'Need help with Physics assignment completion by Friday.',
    maxAmount: '₹200',
    date: 'June 23, 2025',
  },
  {
    id: 2,
    name: 'Aman Verma',
    description: 'Looking for someone to draw 3 EGL sheets for my lab record.',
    maxAmount: '₹120',
    date: 'June 22, 2025',
  },
  {
    id: 3,
    name: 'Palak Bansal',
    description: 'Need lab file writing for Chemistry, urgent!',
    maxAmount: '₹180',
    date: 'June 21, 2025',
  },
]

const Services = () => {
  let firebase=UseFirebase()
  
  const [services, setServices] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', maxAmount: '' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestedServices, setShowSuggestedServices] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
        return [];
      }
    }
    fetchServices()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!form.name || !form.description || !form.maxAmount) {
      setError("All fields are required");
      return  
    }

    setLoading(true);
    let data= await firebase.getUserByUID(firebase.user.uid);
    const Section=data.Section;
    let response= await fetch("/api/services",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: firebase.user.uid,
        name: form.name,
        section:Section,
        description: form.description,
        maxAmount: form.maxAmount,
      }),
      cache: "no-cache"
    })
    
    setSuccess(true);
    setTimeout(() => {
      setLoading(false);
      setError(null);
      setSuccess(false);
      setShowRequestForm(false);
      setForm({ name: '', description: '', maxAmount: ''});
      window.location.reload()
    }, 2000);
  };

  return (
    <div className='min-w-screen min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900'>
      <div className="service-navbar w-full h-[10vh] -purple-500">
        <span className='float-right me-12 flex gap-3 h-full items-center max-sm:float-none max-sm:justify-center max-sm:me-0'>
          <Defbutton title="Request a Service " className="bg-purple-600 text-white text-lg max-sm:text-sm font-normal border-2 hover:scale-105 p-2 border-black " onClick={() => setShowRequestForm(true)} />
            <Link href="/services/myservices">
          <Defbutton title="Your Requests " className="bg-white text-black text-lg max-sm:text-sm font-normal border-2 hover:scale-105 p-2 border-black " />
            </Link>
        </span>
      </div>
      {showRequestForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181c24]/70 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg p-7 w-[90%] max-w-md relative">
            <button
              className="absolute top-2 right-2 text-sm bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => setShowRequestForm(false)}
            >
              Close
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Request a Service</h2>
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                <p className="text-sm">{error}</p>  
              </div>
            )}
            {success && (
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white/80 z-50 rounded-xl">
                <svg className="w-16 h-16 text-green-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-xl font-bold text-green-700">Request Submitted!</p>
              </div>
            )}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="p-2 border rounded"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Describe your request"
                className="p-2 border rounded"
                value={form.description}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="maxAmount"
                placeholder="Max Amount Willing to Pay (₹)"
                className="p-2 border rounded"
                value={form.maxAmount}
                onChange={handleChange}
                required
              />
              {loading ?
              (
                <button className="bg-purple-600 text-white text-lg w-full p-2 rounded cursor-not-allowed" disabled>
                  Submitting...
                </button>
              ) : (
                 <Defbutton title="Submit Request" className="bg-purple-600 text-white text-lg w-full hover:bg-purple-700" />
              )}
             
            </form>
          </div>
        </div>
      )}
      {showSuggestedServices && (
        <div className="flex flex-wrap justify-evenly mt-10 px-4 max-sm:hidden w-[80%] mx-auto bg-white/20 p-4 rounded-4xl relative gap-2">
          <button
            className="absolute top-0 right-0 m-2 p-2 rounded-full bg-red-600 shadow-lg hover:scale-110 transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-400 group"
            aria-label="Close suggested services section"
            title="Close"
            tabIndex={0}
            onClick={() => {setShowSuggestedServices(false)}}
          >
            <svg className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
          {dummyServices.map(service => (
            <div key={service.id} className="bg-white/90 rounded-xl shadow-lg p-6 w-[320px] max-w-full flex flex-col gap-2 border-2 border-purple-200 hover:scale-105 transition relative">
              <span className="absolute top-0.5 right-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider z-10">Suggested</span>
              <h3 className="text-xl font-bold text-purple-800 mb-1">{service.title}</h3>
              <p className="text-gray-700 mb-2">{service.description}</p>
              <span className="text-purple-700 font-semibold mb-2">{service.price}</span>
              <Defbutton title="Request" className="bg-purple-600 text-sm text-white w-full p-0 hover:bg-purple-700" />
            </div>
          ))}
        </div>
      )}
      <h2 className="text-4xl font-bold text-white text-center my-10">Recent Requests</h2>
      <div className="flex flex-wrap justify-center gap-8 px-4 mb-10">
        {services.map(req => (
          <div key={req._id} className="bg-white/90 rounded-xl shadow-lg p-5 w-[320px] max-w-full flex flex-col gap-2 border-2 border-indigo-200 hover:scale-105 transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-700 font-bold text-base">{req.name}</span>
              <span className="text-xs text-gray-500">{req.date}</span>
            </div>
            <p className="text-gray-800 mb-2">{req.description}</p>
            <span className="text-indigo-700 font-semibold mb-2">Max: {req.maxAmount}</span>
            <Defbutton title="Offer Help" className="bg-indigo-600 text-sm text-white w-full p-0 hover:bg-indigo-700" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services