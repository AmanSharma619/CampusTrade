"use client"
import { ArrowRight } from 'lucide-react'
import React from 'react'

const Glowbutton = (props) => {
  return (
    <button className="relative duration-200 inline-flex items-center cursor-pointer dark:shadow-lg dark:shadow-blue-800/80 hover:shadow-xl justify-center p-0.5 mb-2 me-2 overflow-hidden text-2xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500  hover:text-white dark:text-white  focus:outline-none ">
<span className={` flex gap-1 ${props.className} items-center relative px-5 py-2.5 transition-all ease-in duration-200   rounded-md  `}>
{props.title}
<ArrowRight/>
</span>
</button>
  )
}
const Defbutton = (props) => {
  return (
    <button className={`relative duration-200 inline-flex items-center cursor-pointer justify-center px-5.5 py-3 mb-2 me-2 overflow-hidden text-2xl font-bold   rounded-lg group focus:outline-none ${props.className} `}>
{props.title}
</button>
  )
}

export  {Glowbutton,Defbutton}