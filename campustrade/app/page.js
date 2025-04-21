"use client"
import "./page.css"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import {Glowbutton} from '@/components/Button'
import Card from '@/components/Card'
import { Inter,Roboto } from 'next/font/google'
import Script from "next/script"

const home = () => {
  return (
    <>
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/gsap.min.js" strategy="beforeInteractive"/>
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/ScrollTrigger.min.js" strategy="beforeInteractive"/>
    <div className='min-h-screen flex font-bold flex-col sticky top-0 gap-5 main '  >   
      <div className="hero w-full text-9xl mx-auto  text-white tracking-wide text-center min-h-4/5 flex flex-col gap-6 mt-14 p-9 ">
        <h1 className='text-color1 tracking-wider' id="head">Buy. Sell. Borrow. </h1>
         <h2 className='text-5xl font-normal'>From One Student to Another, A Marketplace Exclusively for Your College.</h2>

      </div>
      <div className="buttons flex w-full justify-center items-center gap-4 text-2xl">
        <Glowbutton title="Discover Marketplace" className="bg-gray-900 hover:text-purple-600"/>
        <Glowbutton title="Register" className="bg-white text-black hover:text-purple-600" />
      </div>

      

    </div>
    <div className={`min-h-screen bg-color2 sticky  text-white features flex flex-col justify-around p-3.5 gap-3 `}> 
      <h1 className='text-7xl mx-auto font-bold tracking-wide mt-7'>Features</h1>
      <div className={` cards mt-6`}>
        <Card/>
      </div>
    </div>
    
        </>
  )
}

export default home