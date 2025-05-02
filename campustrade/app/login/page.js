"use client"
import React, { useState } from 'react'
import { Defbutton, Glowbutton } from '@/components/Button'


const Login = () => {
  const [isSignup, setIsSignup] = useState(false)

  const toggleToSignup = () => {
    setIsSignup(true)
    gsap.to("#left", {
      backgroundColor: "#4845ae",
      duration: 1,
    })
    gsap.to("#right", {
      backgroundColor: "black",
      duration: 1,
    })
  }

  const toggleToLogin = () => {
    setIsSignup(false)
    gsap.to("#left", {
      backgroundColor: "black", // reset to original color
      duration: 1,
    })
    gsap.to("#right", {
      backgroundColor: "#4845ae", // or your original right div color
      duration: 1,
    })
  }

  return (
    <div className='authdiv h-[90vh] flex'>
      {/* Left Panel */}
      <div className='left-div h-full w-full flex flex-col items-center justify-center gap-4' id='left'>
        {isSignup ? (
          <>
            <h1 className='text-6xl font-bold text-white'>Create an Account</h1>
            <form className='w-4/5 h-2/5 flex flex-col gap-5 items-center justify-center'>
              <input type="text" className='bg-color2 w-4/5 h-10 rounded-2xl text-white p-1.5' placeholder='Name' />
              <input type="email" className='bg-color2 w-4/5 h-10 rounded-2xl text-white p-1.5' placeholder='Email' />
              <input type="password" className='bg-color2 w-4/5 h-10 rounded-2xl text-white p-1.5' placeholder='Password' />
              <Glowbutton title="Sign Up" />
            </form>
          </>
        ) : (
          <>
            <h1 className='text-6xl font-bold'>Login to Your Account</h1>
            <form className='w-4/5 h-2/5 flex flex-col gap-5 items-center justify-center'>
              <input type="text" className='bg-color2 w-4/5 h-10 rounded-2xl text-white p-1.5' placeholder='Email' />
              <input type="password" className='bg-color2 w-4/5 h-10 rounded-2xl text-white p-1.5' placeholder='Password' />
              <Glowbutton title="Login" />
            </form>
          </>
        )}
      </div>

      {/* Right Panel */}
      <div className='right-div bg-color1 h-full w-full flex flex-col items-center justify-center gap-4' id='right'>
        {isSignup ? (
          <>
            <h1 className='text-white text-7xl font-bold'>Welcome Back</h1>
            <h2 className='text-2xl  font-normal'>Already have an account? Login now</h2>
            <Defbutton title="Login" className="bg-white" onClick={toggleToLogin} />
          </>
        ) : (
          <>
            <h1 className='text-white text-7xl font-bold'>New Here?</h1>
            <h2 className='text-2xl text-color2 font-normal'>Sign Up and Discover The Marketplace</h2>
            <Defbutton title="Sign Up" className="bg-white" onClick={toggleToSignup} />
          </>
        )}
      </div>
    </div>
  )
}

export default Login
