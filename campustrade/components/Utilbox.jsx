"use client"
import { Search } from 'lucide-react'
import "./util.css"
import { Glowbutton } from './Button'
import React, { useState, useEffect } from 'react'
import { Filter}  from './Filter'
const Utilbox = (props) => {
 
  
  return (
    <div className='flex  items-center w-full h-[10vh] bg-transparent relative justify-around util'>


      <div class="w-[50%]  ">
        <div class="relative">
          <input
            class="w-full focus:bg-gray-800 bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Calculator, Lab coat..."
          />
          <button
            class="absolute top-1 right-1 flex items-center rounded bg-transparent py-0.5 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <Search />

            Search
          </button>
        </div>
      </div>
      
      <Filter />
      <span>
        <Glowbutton title="Request" className="bg-gray-900 text-sm hover:scale-105 max-md:p-0"/>
        <Glowbutton title="Sell/Lend" className="bg-gray-900 text-sm hover:scale-105"/>
      </span>
    </div>
  )
}

export default Utilbox
