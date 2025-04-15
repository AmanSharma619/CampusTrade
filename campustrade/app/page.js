"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {Glowbutton,Defbutton} from '@/components/Button'
import "./page.css"
import Card from '@/components/Card'
import { Inter,Roboto } from 'next/font/google'
const font_inter = Inter({
  variable: "--inter",
  weight: ['300','400', '700'],
  subsets: ["latin"],
});
const home = () => {
  return (
    <>
    <div className='min-h-screen flex font-bold flex-col sticky top-0 gap-5 main'  >   
      <div className="hero w-full text-9xl mx-auto  text-white tracking-wide text-center min-h-4/5 flex flex-col gap-6 mt-14 p-9 ">
        <h1 className='text-color1 tracking-wider'>Buy. Sell. Borrow. </h1> <h2 className='text-5xl font-normal'>From One Student to Another, A Marketplace Exclusively for Your College.</h2>

      </div>
      <div className="buttons flex w-full justify-center items-center gap-4 text-2xl">
        <Glowbutton title="Discover Marketplace" className="bg-gray-900 hover:text-purple-600"/>
        <Glowbutton title="Register" className="bg-white text-black hover:text-purple-600" />
      </div>

      

    </div>
    <div className={`min-h-screen bg-background sticky border-t-2 border-b-2 border-white text-white features flex flex-col justify-around p-3.5 gap-3 ${font_inter.className}`}> 
      <h1 className='text-6xl mx-auto underline font-normal tracking-wide mt-7'>Why CampusTrade?</h1>
      <div className={` cards mt-6`}>
        <Card/>
      </div>
    </div>
        </>
  )
}

export default home