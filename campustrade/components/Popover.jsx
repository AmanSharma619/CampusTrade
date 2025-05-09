"use client"
import React ,{useEffect} from 'react'
import Image from 'next/image'

export const Signin_Popover = (props) => {
    // Entrance animation
    useEffect(() => {
        // Entrance animation
        gsap.from("#popover", {
          x: 5,
          opacity: 1,
          duration: 2,
          ease: "power3.out"
        })
      }, [])
  return (
    <div className={`absolute top-3 popover ${props.className} `}>
        
      <Image src={"/Popover_svg.svg"} width={props.width} height={props.height} alt='popover' className='relative' id='popover'/>
    </div>
  )
}

export const Signout_Popover = (props) => {
    // Entrance animation
    useEffect(() => {
        // Entrance animation
        gsap.from("#popover2", {
          x: 5,
          opacity: 1,
          duration: 2,
          ease: "power3.out"
        })
      }, [])
  return (
    <div className={`absolute top-3 popover ${props.className} `}>
        
      <Image src={"/Signup_popover.svg"} width={props.width} height={props.height} alt='popover' className='relative' id='popover2'/>
    </div>
  )
}
