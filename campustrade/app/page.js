"use client"
import "./page.css"
import Image from 'next/image'
import Link from 'next/link'
import { UseFirebase } from "@/auth/firebase"
import React, { useEffect, useState ,useRef} from 'react'
import {Glowbutton} from '@/components/Button'
import { Calculator,BookOpen } from "lucide-react"
import Card from '@/components/Card'
import { Inter,Roboto } from 'next/font/google'
import SplitType from "split-type"


const home = () => {
  const firebase=UseFirebase()
  const user=firebase.user
  


const hasAnimatedRef = useRef(false);

useEffect(() => {
  if (hasAnimatedRef.current) return;

  hasAnimatedRef.current = true;

  const text = new SplitType("#head");  
  const text2 = new SplitType("#subtext");

  const t = gsap.timeline();

  t.from("#head .char", {
    y: 130,
    opacity: 0,
    stagger: 0.05,
    duration: 0.7
  });
  t.from("#subtext", {
    opacity: 0,
    duration: 1,
    stagger: { each: 0.05 },
    ease: "power1.inOut"
  });
  t.from("#calc", {
    y: 200,
    opacity: 0,
    duration: 0.8,
    ease: "power1.out"
  });
  t.from("#book", {
    y: 200,
    opacity: 0,
    duration: 0.8,
    ease: "power1.out"
  });
gsap.from(".feature-heading",{
  scale:0,
  opacity:0,
  duration:0.8,
  scrollTrigger:{
    trigger:".features",
    start: "top 70%"
  }
})

}, []);

  return (
    <> 
    <div className='min-h-screen flex font-bold flex-col sticky top-0 gap-5 main '  >   
      <div className="hero w-full text-9xl mx-auto  text-white tracking-wide text-center min-h-4/5 flex flex-col gap-6 mt-14 p-9 ">
        <h1 className=' tracking-wider overflow-y-hidden' id="head" >Buy. Sell. Borrow. </h1>
         <h2 className='text-5xl font-normal ' id="subtext">From One Student to Another, A Marketplace Exclusively for Your College.</h2>

      </div>
      <div className="buttons flex w-full justify-center items-center gap-4 text-2xl">
        <Link href={'/marketplace'}>
        <Glowbutton title="Discover Marketplace" className="bg-gray-900 hover:text-purple-600"/>
        </Link>

        {!user && <Link href={'/login'}><Glowbutton title="Register" className="bg-white text-black hover:text-purple-600" /></Link>}
        {user &&  <Link href={"/services"}> <Glowbutton title="Request Services" className="bg-gray-900 hover:text-purple-600"/></Link> }
      </div>
      <span className="absolute rotate-12 right-64 bottom-64 max-md:top-20 max-md:right-16 calc text-white">
        <Calculator size={80} strokeWidth={0.5} id="calc"/>
      </span>
      <span className="absolute bottom-80 left-1/6 -rotate-12 max-md:top-6 max-md:left-20 book text-white">
        <BookOpen size={70} strokeWidth={0.5} id="book"/>
      </span>
      

    </div>
    <div className={`min-h-screen bg-white sticky  text-white features flex flex-col justify-around p-3.5 gap-3 `}> 
      <h1 className='text-7xl mx-auto font-bold tracking-wide mt-7 feature-heading'>Features</h1>
      <div className={` cards mt-6`}>
        <Card/>
      </div>
    </div>
    
        </>
  )
}

export default home