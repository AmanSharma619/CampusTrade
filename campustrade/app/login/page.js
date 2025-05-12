"use client"
import "./page.css"
import { UseFirebase } from "@/auth/firebase"
import { onAuthStateChanged ,getAuth,signOut} from "firebase/auth"
import React, { useEffect, useState } from 'react'
import {Signin_Popover,Signout_Popover} from "@/components/Popover"
import { Defbutton, Glowbutton } from '@/components/Button'
import { IDcardinput } from "@/components/IDcardinput"
import Image from "next/image"



const Login = () => {


  const firebase=UseFirebase()
  const [isSignup, setIsSignup] = useState(false)
  
  const [loader , isLoader]=useState(false)
  const [name,setName]=useState("")
  const [section,setSection]=useState("")
  const [year,setYear]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const [SigninEmail,setSigninEmail]=useState("")
  const [SigninPassword,setSigninPassword]=useState("")

  const [showPopover, setShowPopover] = useState(false)
  const [showPopover2, setShowPopover2] = useState(false)

  const [error,setError]=useState(null)
  const [signuperror,setSignupError]=useState(null)

  const [image,setImage]=useState("")
  const [isVerified,setVerified]=useState(false)

  function handleVerification(status){
   if(status==true){
    setVerified(true)
   }
  }
  function uploadImage(url){
setImage(url)
  }
   const auth=getAuth()
      const user=auth.currentUser

      const [currUser,setUser]=useState(user)
  
    useEffect(() => {
      const auth_state = onAuthStateChanged(auth, (user) => {
        setUser(user);  
        if (user) {
          console.log("User signed in:");
          setTimeout(() => {
            
            window.location.href="/"
          }, 3500);
        } else {
          console.log("User signed out");
        }
      });
    
     
      return () => auth_state();
    }, []);



 

  function signupnewuser() {
    isLoader(true)
  if (!name || !section || !year || !email || !password || !image ) {
    setSignupError("Please fill in all the fields.");
    return;
  }
  if(password.length<6){
    setSignupError("Password should be atleast 6 letters")
  }
  if(!isVerified){
    setSignupError("Verify the image first")
    return;
  }
  setSignupError(null);

  firebase.signupUserWithEmailAndPassword(email, password)
    .then(() => {
      isLoader(false)
      setShowPopover2(true);
      setTimeout(() => setShowPopover2(false), 3500);
    })
    .catch((e) => {
      setSignupError(e.message);
    });
}


  function SigninUser() {
    isLoader(true)
    firebase.signinUserWithEmailAndPassword(SigninEmail, SigninPassword)
      .then(() => {
        console.log("done");
        isLoader(false)
        setShowPopover(true); // Show popover
        setTimeout(() => {
          setShowPopover(false); // Hide popover after 2 sec
        }, 3500);
        setError(null)
      })
      .catch((e) => {
        setError(e.message)
      });
  }
  
  

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
    <div className='authdiv h-[90vh] flex '>
      {/* Left Panel */}
      <div className='left-div h-full w-full flex flex-col items-center justify-center gap-4 max-sm:gap-10 max-sm:relative' id='left'>
        {isSignup ? (
          <>
          {showPopover2 && <Signout_Popover id="popover2" className=" max-sm:absolute" height={300} width={300}/>}
            <h1 className='text-6xl font-bold text-white text-center'>Create an Account</h1>
            {signuperror && <h2 className="text-red-600">{signuperror}</h2>}
            <div className='w-4/5 min-h-3/5 flex flex-col gap-5 items-center justify-center '>
              <input type="text" className='bg-color2 w-4/5 h-10 rounded-2xl text-white p-1.5' value={name} placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>
              <input type="text" className='bg-color2 w-4/5 h-10 rounded-2xl text-white p-1.5' value={section} placeholder='Section'  onChange={(e)=>{setSection(e.target.value)}} />
              <input type="text" className='bg-color2 w-4/5 h-10 rounded-2xl text-white p-1.5' value={year} placeholder='Passing Year'  onChange={(e)=>{setYear(e.target.value)}}/>
              <input type="email" className='bg-color2 w-4/5 h-10 rounded-2xl text-white p-1.5' value={email} placeholder='Student Email'  onChange={(e)=>{setEmail(e.target.value)}}/>
              <input type="password" className='bg-color2 w-4/5 h-10 rounded-2xl text-white p-1.5' value={password} placeholder='Password (min 6 letters)'  onChange={(e)=>{setPassword(e.target.value)}}/>
              <span className='text-color2 text-center'>Upload College ID Card(image or pdf)</span>
              <IDcardinput onVerified={handleVerification} onUpload={uploadImage} />
              <span className="text-white hidden max-sm:block">OR</span>
              {loader? (
                <Image src={"/loader.svg"} height={60} width={60} alt="loader"/>
              ) : (
                <Glowbutton title="Sign Up" onClick={signupnewuser} />

              )}
              <Defbutton title="Login" className="bg-white sm:hidden max-sm:block" onClick={toggleToLogin} />
            </div>
          </>
        ) : (
          <>
           {showPopover && <Signin_Popover id="popover" className=" max-sm:absolute" height={300} width={300}/>}
            <h1 className='text-6xl font-bold text-center'>Login to Your Account</h1>
            {error && <h2 className="text-red-600">Invalid Credentials</h2>}
            <div className='w-4/5 h-2/5 flex flex-col gap-5 items-center justify-center'>
              <input type="email" className='bg-color2 w-4/5 h-10 rounded-2xl text-white p-1.5' placeholder='Email' value={SigninEmail} onChange={e=> setSigninEmail(e.target.value)} />
              <input type="password" className='bg-color2 w-4/5 h-10 rounded-2xl text-white p-1.5' placeholder='Password' value={SigninPassword} onChange={e=> setSigninPassword(e.target.value)} />
             
                {loader? (
                <Image src={"/loader.svg"} height={60} width={60} alt="loader"/>
              ) : (
                <Glowbutton title="Login" onClick={SigninUser}  />

              )}
              <span className="text-white hidden max-sm:block">OR</span>
              <Defbutton title="Sign Up" className="bg-white sm:hidden max-sm:block" onClick={toggleToSignup} />
            </div>
          </>
        )}
      </div>

      {/* Right Panel */}
      <div className='right-div bg-color1 h-full w-full flex flex-col items-center justify-center gap-4 max-sm:hidden relative' id='right'>
        {isSignup ? (
          <>
          {showPopover2 && <Signout_Popover id="popover2" height={500} width={500}/>}
            <h1 className='text-white text-7xl font-bold text-center'>Welcome Back</h1>
            <h2 className='text-2xl  font-normal text-center'>Already have an account? Login now</h2>
            <Defbutton title="Login" className="bg-white" onClick={toggleToLogin} />
          </>
        ) : (
          <>
          {showPopover && <Signin_Popover id="popover" height={500} width={500}/>}
          


            <h1 className='text-white text-7xl font-bold text-center'>New Here?</h1>
            <h2 className='text-2xl text-color2 font-normal text-center'>Sign Up and Discover The Marketplace</h2>
            <Defbutton title="Sign Up" className="bg-white" onClick={toggleToSignup} />
          </>
        )}
      </div>
    </div>
  )
}

export default Login
