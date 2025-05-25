"use client"
import React, { useState,useContext } from 'react';
import { FilterContext } from '@/app/marketplace/page';
export const Filter = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
const filter = useContext(FilterContext);

const handleCheckboxChange = (label, isChecked) => {
  if (isChecked) {
    if (!filter.params.includes(label)) {
      filter.setParams(prev => [...prev, label]);
    }
  } else {
    filter.setParams(prev => prev.filter(item => item !== label));
  }
};

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative inline-block">
        <button
          id="dropdownDefault"
          onClick={toggleDropdown}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
          type="button"
        >
          Filter by category
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {isDropdownOpen && (
          <div
            id="dropdown"
            className="absolute top-full left-0 z-10 w-56 p-3 rounded-lg shadow bg-gray-700 mt-2"
          >
            <h6 className="mb-3 text-sm font-medium text-white">
              Category
            </h6>
            <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
              {[
                { id: "Requested", label: "Requested" },
                { id: "Lending", label: "Lending" },
                { id: "Sell", label: "Selling" },
              ].map((item) => (
                <li key={item.id} className="flex items-center">
                  <input
                    id={item.id}
                    type="checkbox"
                    checked={filter.params.includes(item.label)}  
                    onChange={(e) => handleCheckboxChange(item.label, e.target.checked)}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 "
                  />
                  <label
                    htmlFor={item.id}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {item.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
