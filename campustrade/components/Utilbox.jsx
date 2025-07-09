"use client"
import { Search } from 'lucide-react'
import "./util.css"
import { Defbutton, Glowbutton } from './Button'
import React, { useState, useEffect } from 'react'
import { Filter } from './Filter'
import Link from 'next/link'

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
              placeholder="Calculator..."
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
        <span className=' top-full flex gap-2 mb-3'>
        <Defbutton title="Request" className="bg-white text-xs me-0 hover:scale-105 rounded-4xl " onClick={()=>{
          props.setShowRequestForm(true);
        }}/>
        <Defbutton title="Sell/Lend" className="bg-white text-xs me-0 hover:scale-105" onClick={()=>{
          props.setShowForm(true);
          
        }}/>
        <Link href="/marketplace/mylistings">
        <Defbutton title="My Listings" className="bg-white text-xs me-0 hover:scale-105"  />
        </Link>
      </span>
              </div>
    );
  }

  return (
    <div className='flex items-center w-full min-h-[10vh] bg-transparent relative justify-around util'>
      <div className="w-[30%] flex gap-2 items-center">
        <div className="relative flex-1">
          <input
            className="w-full focus:bg-gray-800 bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Calculator..."
          />
          <button
            className="absolute top-1 right-1 flex items-center rounded bg-transparent py-0.5 px-2 max-sm:px-1 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <Search />
            Search
          </button>
        </div>
        {/* Sort By Dropdown */}
        <div className="relative">
          <select
            className="bg-gray-900 text-white text-sm rounded-md px-3 py-2 border border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 shadow-sm"
            defaultValue="newest"
            onChange={e => {
              if (props.onSortChange) props.onSortChange(e.target.value);
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Older First</option>
          </select>
        </div>
      </div>
      <Filter />
      <span>
        <Glowbutton title="Request" className="bg-gray-900 text-sm  " onClick={()=>{
          props.setShowRequestForm(true);
          
        }}/>
        <Glowbutton title="Sell/Lend" className="bg-gray-900 text-sm " onClick={()=>{
          console.log("clicked");
          props.setShowForm(true);
          
        }} />
        <Link href="/marketplace/mylistings">
        <Glowbutton title="My Listings" className="bg-gray-900 text-sm "  />
        </Link>
      </span>
    </div>
  );
}

export default Utilbox;
