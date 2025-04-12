"use client"
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import React from 'react'
import { useRef,useEffect ,useState} from 'react'

const home = () => {
  const vantaRef = useRef(null);
  const [vantaReady, setVantaReady] = useState(false)
  useEffect(() => {
    if (!vantaReady || !vantaRef.current || !window.VANTA) return;
  const vantaEffect = VANTA.DOTS({
    el: vantaRef.current,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x535c91,
    color2: 0x535c91,
    backgroundColor: 0x070f2b,
    size: 4.10,
    spacing: 30.00,
    showLines: false
  })
     return () => {
    vantaEffect.destroy();
    clearTimeout(timer);
  };
}, [vantaReady]);
  return (
    <div className='min-h-screen flex font-bold items-center' ref={vantaRef}  >
       <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" strategy="beforeInteractive" />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js"
        strategy="afterInteractive"
        onLoad={() => setVantaReady(true)}
      />
      <div className="hero w-4/5 text-6xl mx-auto  text-white tracking-wide text-center min-h-3/4 ">
       Campus Deals Made Easy With  <span className=' text-7xl '>CampusTrade!</span>

      </div>
      
    </div>
  )
}

export default home