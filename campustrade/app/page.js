"use client"
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import React from 'react'
import { ArrowRight } from 'lucide-react'
import {Glowbutton,Defbutton} from '@/components/Button'
import { useRef, useEffect, useState } from 'react'
import "./page.css"
import Card from '@/components/Card'
const home = () => {
  const vantaRef = useRef(null);
  const [vantaReady, setVantaReady] = useState(false)
  useEffect(() => {
    if (!vantaReady || !vantaRef.current || !window.VANTA) return;
    const vantaEffect = VANTA.CELLS({
      el: vantaRef.current,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      color1: 0x070f2b,
      color2: 0x1B1A55,
      size: 3.30
    })
    return () => {
      vantaEffect.destroy();
      clearTimeout(timer);
    };
  }, [vantaReady]);
  return (
    <>
    <div className='min-h-screen flex font-bold flex-col sticky top-0' ref={vantaRef}  >
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" strategy="beforeInteractive" />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.cells.min.js"
        strategy="afterInteractive"
        onLoad={() => setVantaReady(true)}
        />
      <div className="hero w-full text-9xl mx-auto  text-white tracking-wide text-center min-h-4/5 flex flex-col gap-6 mt-14 p-9 ">
        <h1 className='text-color1 tracking-wider'>Buy. Sell. Borrow. </h1> <h2 className='text-5xl font-normal'>From One Student to Another, A Marketplace Exclusively for Your College.</h2>

      </div>
      <div className="buttons flex w-full justify-center items-center gap-4 text-2xl">
        <Glowbutton title="Discover Marketplace" className="bg-gray-900 hover:text-purple-600"/>
        <Glowbutton title="Register" className="bg-white text-black hover:text-purple-600" />
  
      </div>
      

    </div>
    <div className='h-screen bg-background sticky text-white features flex flex-col justify-around'> 
      <h1 className='text-6xl mx-auto underline font-light tracking-wide'>Why CampusTrade?</h1>
      <div className="cards">
        <Card/>
      </div>
    </div>
        </>
  )
}

export default home