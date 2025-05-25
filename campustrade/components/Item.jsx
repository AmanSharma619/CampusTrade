"use client"
import "./item.css"
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Defbutton } from "./Button"

const Item = (props) => {
   
    

  return (
    <div className='min-w-[17vw] h-[45vh] bg-white rounded-xl flex flex-col p-2 gap-2 flex-wrap justify-evenly text-black item hover:scale-105 transition duration-200'>

        <div className='relative w-full h-[50%] rounded-xl'> 
        <Image src="/calc.jpg" alt="image" fill style={{objectFit:'contain',width:'100%'}} />
        </div>
        <div className='flex items-center gap-1.5 flex-wrap'>
        <h1 className='text-2xl'>{props.title}</h1>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold 
        ${props.action === "Requested" || props.action==="requested" ? "bg-green-100 text-green-700" : 
          props.action === "Lending" || props.action==="lending" ? "bg-yellow-100 text-yellow-700" : 
          "bg-red-100 text-red-700"}`}>
        {props.action}
      </span>
        </div>

        <div>
        <h2 className='text-lg'>{props.name}</h2>
        <h2 className='text-lg'>{props.section}</h2>
        </div>
        <div className="w-full text-white">
         <Defbutton title="Chat Now" className="bg-black w-full text-white hover:text-purple-600 text-sm hover:scale-105 transition duration-200 border-2 border-purple-800">
          <MessageCircle/>
         </Defbutton>
        </div>

    </div>
  )
}


export default Item