"use client"
import { Search } from 'lucide-react'
import "./util.css"
import { Defbutton } from './Button'
import React, { useState, useEffect } from 'react'
const Utilbox = () => {
  const [value, changeValue] = useState(null)
  useEffect(() => {
    console.log(value);

  }, [value])
  return (
    <div className='flex flex-col items-center w-[25vw] h-full bg-transparent gap-10 relative top-7  util'>


      <div class="w-[80%] max-w-sm min-w-[200px]">
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
      <span>

      
<div class="flex items-center">
    <input id="default-checkbox" type="checkbox" value="" class="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label for="default-checkbox" class="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300">Selling</label>
</div>
<div class="flex items-center">
    <input type="checkbox" value="" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label for="checked-checkbox" class="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300">Lending</label>
</div>
<div class="flex items-center">
    <input type="checkbox" value="" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label for="checked-checkbox" class="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300">Requested</label>
</div>

      </span>

    </div>
  )
}

export default Utilbox
