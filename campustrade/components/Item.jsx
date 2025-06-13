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
            <div className='relative w-full h-48 rounded-xl mb-4'>
              <Image src="/calc.jpg" alt="image" fill style={{objectFit:'contain',width:'100%'}} />
            </div>
             <div className='flex items-center gap-2 mb-2'>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                ${props.action === "Requested" || props.action==="requested" ? "bg-green-100 text-green-700" : 
                  props.action === "Lending" || props.action==="lending" ? "bg-yellow-100 text-yellow-700" : 
                  "bg-red-100 text-red-700"}`}>
                {props.action}
              </span>
              
            </div>
            <h1 className='text-2xl font-bold mb-2'>{props.title}</h1>
            <h2 className="mb-3">{props.description}</h2>
           
            <h2 className='text-lg mb-2'>Posted by: </h2>
            <h2 className='text-lg font-semibold mb-4 text-purple-800'>{props.name} {props.section}</h2>
            {/* Add more detailed info here if available */}
            <Defbutton title="Chat Now" className="bg-black w-full chatbut text-white hover:text-purple-600 text-sm hover:scale-105 transition duration-200 border-2 border-purple-800 mt-4" />
          </div>
        </div>
      );
    }

  return (
    <div
      className='min-w-[17vw] h-[45vh] bg-tranparent rounded-xl flex flex-col p-2 gap-2 flex-wrap justify-evenly text-white item hover:scale-105 transition duration-200 border-2 border-white cursor-pointer'
      onClick={() => setShowDetails(true)}
    >

        <div className='relative w-full h-[50%] rounded-xl'> 
        <Image src="/calc.jpg" alt="image" fill style={{objectFit:'contain',width:'100%'}} />
        </div>
        <div className='flex items-center gap-1.5 flex-wrap max-sm:flex-col max-sm:items-start'>
        <h1 className='text-2xl '>{props.title}</h1>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold 
        ${props.action === "Requested" || props.action==="requested" ? "bg-green-100 text-green-700" : 
          props.action === "Lending" || props.action==="lending" ? "bg-yellow-100 text-yellow-700" : 
          "bg-red-100 text-red-700"}`}>
        {props.action}
      </span>
        </div>

        <div className="max-sm:flex max-sm:w-full max-sm:gap-2 max-sm:items-center">
        <h2 className='text-lg max-sm:text-sm'>{props.name}</h2>
        <h2 className='text-xl max-sm:text-sm'>{props.section}</h2>
        </div>
        <div className="w-full flex justify-center ">
         <Defbutton title="Chat Now" className="bg-black w-full chatbut  text-white hover:text-purple-600 text-sm hover:scale-105 transition duration-200 border-2 border-purple-800">
         </Defbutton>
        </div>

    </div>
  )
}


export default Item