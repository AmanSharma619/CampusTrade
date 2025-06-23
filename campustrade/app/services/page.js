import React from 'react'
import { Defbutton } from '@/components/Button'

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

const Services = () => {
  return (
    <div className='min-w-screen min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900'>
      <div className="service-navbar w-full h-[10vh] -purple-500">
        <span className='float-right me-12 flex gap-3 h-full items-center max-sm:float-none max-sm:justify-center max-sm:me-0'>
          <Defbutton title="Request a Service " className="bg-white text-lg max-sm:text-sm font-normal border-2 hover:scale-105 p-2 border-black text-black" />
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mt-10 px-4">
        {dummyServices.map(service => (
          <div key={service.id} className="bg-white/90 rounded-xl shadow-lg p-6 w-[320px] max-w-full flex flex-col gap-2 border-2 border-purple-200 hover:scale-105 transition relative">
            <span className="absolute top-0.5 right-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider z-10">Suggested</span>
            <h3 className="text-xl font-bold text-purple-800 mb-1">{service.title}</h3>
            <p className="text-gray-700 mb-2">{service.description}</p>
            <span className="text-purple-700 font-semibold mb-2">{service.price}</span>
            <Defbutton title="Request" className="bg-purple-600 text-white w-full p-0 hover:bg-purple-700" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services