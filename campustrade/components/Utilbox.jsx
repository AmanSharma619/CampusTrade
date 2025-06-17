"use client"
import { Search } from 'lucide-react'
import "./util.css"
import { Glowbutton } from './Button'
import React, { useState, useEffect } from 'react'
import { Filter } from './Filter'

const Utilbox = (props) => {
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (viewportWidth < 460) {
    return (
      <div className='flex flex-col items-center'>

      <div className='flex items-center w-full min-h-[10vh] bg-transparent relative justify-center util p-2'>
        <div className="w-[90%]">
          <div className="relative">
            <input
              className="w-full focus:bg-gray-800 bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Calculator, Lab coat..."
              />
            <button
              className="absolute top-1 right-1 flex items-center rounded bg-transparent p-0.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              >
              <Search />
              Search
            </button>
          </div>
        </div>
        <Filter />
      </div>
        <span className=' top-full '>
        <Glowbutton title="Request" className="bg-gray-900 text-sm hover:scale-105 " onClick={()=>{
          props.setShowRequestForm(true);
        }}/>
        <Glowbutton title="Sell/Lend" className="bg-gray-900 text-sm hover:scale-105" onClick={()=>{
          props.setShowForm(true);
          
        }}/>
      </span>
              </div>
    );
  }

  return (
    <div className='flex items-center w-full min-h-[10vh] bg-transparent relative justify-around util'>
      <div className="w-[50%]">
        <div className="relative">
          <input
            className="w-full focus:bg-gray-800 bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Calculator, Lab coat..."
          />
          <button
            className="absolute top-1 right-1 flex items-center rounded bg-transparent py-0.5 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <Search />
            Search
          </button>
        </div>
      </div>
      <Filter />
      <span>
        <Glowbutton title="Request" className="bg-gray-900 text-sm hover:scale-105 " onClick={()=>{
          props.setShowRequestForm(true);
          
        }}/>
        <Glowbutton title="Sell/Lend" className="bg-gray-900 text-sm hover:scale-105" onClick={()=>{
          console.log("clicked");
          props.setShowForm(true);
          
        }} />
      </span>
    </div>
  );
}

export default Utilbox;
