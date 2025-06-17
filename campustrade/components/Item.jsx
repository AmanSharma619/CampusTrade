"use client"
import "./item.css"
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Defbutton } from "./Button"

const Item = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  if (showDetails) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181c24]/70 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative text-black">
          <button
            className="absolute top-2 right-2 text-sm bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => setShowDetails(false)}
          >
            Close
          </button>
          <div className='relative w-full max-sm:w-[90%] h-48 rounded-xl mb-4'>
            <Image src={props.image} alt="image" fill style={{ objectFit: 'contain', width: '100%' }} />
          </div>
          <div className='flex items-center gap-2 mb-2'>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                ${props.action === "Requested" || props.action === "requested" ? "bg-green-100 text-green-700" :
                props.action === "Lending" || props.action === "lending" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"}`}>
              {props.action}
            </span>

          </div>
          <h1 className='text-2xl font-bold mb-2'>{props.title}</h1>
          <h2 className="mb-3">{props.description}</h2>

          <h2 className='text-lg '>Posted by: </h2>
          <div className="flex justify-between">
            <h2 className='text-lg font-semibold  text-purple-800'>{props.name} {props.section}</h2>
            <h2 className='text-lg font-semibold  text-purple-800'>{props.date}</h2>
          </div>
          {/* Add more detailed info here if available */}
          <Defbutton title="Chat Now" className="bg-black w-full chatbut text-white hover:text-purple-600 text-sm hover:scale-105 transition duration-200 border-2 border-purple-800 mt-2" />
        </div>
      </div>
    );
  }

  return (
    <div
      className='min-w-[17vw] min-h-[47vh] bg-tranparent rounded-xl flex flex-col p-2 gap-2 max-sm:gap-0.5 flex-wrap justify-evenly text-white item hover:scale-105 transition duration-200 border-2 border-white cursor-pointer'
      onClick={() => setShowDetails(true)}
    >

      <div className='relative w-full h-[50%] rounded-xl'>
        <Image src={props.image} alt="image" fill style={{ objectFit: 'contain', width: '100%' }} />
      </div>
      <div className='flex items-center gap-1.5 flex-wrap max-sm:flex-col max-sm:items-start'>
        <h1 className='text-2xl'>
          {props.title.length <= 10 ? props.title : props.title.slice(0, 9) + "..."}
        </h1>

        <span className={`px-2 py-1 rounded-full text-xs font-semibold 
        ${props.action === "Requested" || props.action === "requested" ? "bg-green-100 text-green-700" :
            props.action === "Lending" || props.action === "lending" ? "bg-yellow-100 text-yellow-700" :
              "bg-red-100 text-red-700"}`}>
          {props.action}
        </span>
      </div>

      <div className=" max-sm:w-full max-sm:gap-2 max-sm:items-center ">
        <span className="flex gap-2">
          <h2 className='text-lg max-sm:text-sm'>{props.name}</h2>
          <h2 className='text-lg max-sm:text-sm'>{props.section}</h2>
          {/* <h2 className='text-xl max-sm:text-sm'>{props.section}</h2> */}
        </span>
        <h2 className="text-gray-300 max-sm:text-sm">{props.date}</h2>
      </div>
      <div className="w-full flex justify-center ">
        <Defbutton title="Chat Now" className="bg-black w-full chatbut  text-white hover:text-purple-600 text-sm hover:scale-105 transition duration-200 border-2 border-purple-800">
        </Defbutton>
      </div>

    </div>
  )
}


export default Item