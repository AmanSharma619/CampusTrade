"use client"
import "./page.css"
import { UseFirebase } from "@/auth/firebase"
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth"
import React, { useEffect, useState } from 'react'
import { Signin_Popover, Signout_Popover } from "@/components/Popover"
import { Defbutton, Glowbutton } from '@/components/Button'
import { IDcardinput } from "@/components/IDcardinput"
import Image from "next/image"



const Login = () => {


  const firebase = UseFirebase()
  const [isSignup, setIsSignup] = useState(false)

  const [loader, isLoader] = useState(false)
  const [name, setName] = useState("")
  const [section, setSection] = useState("")
  const [year, setYear] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [SigninEmail, setSigninEmail] = useState("")
  const [SigninPassword, setSigninPassword] = useState("")

  const [showPopover, setShowPopover] = useState(false)
  const [showPopover2, setShowPopover2] = useState(false)

  const [error, setError] = useState(null)
  const [signuperror, setSignupError] = useState(null)

  const [image, setImage] = useState("")
  const [isVerified, setVerified] = useState(false)
  const [file, setFile] = useState(null)

  function handleVerification(status) {
    if (status == true) {
      setVerified(true)
    }
  }
  function uploadImage(url, file) {
    setFile(file)
    setImage(url)
  }
  const auth = getAuth()
  const user = auth.currentUser


  const [currUser, setUser] = useState(user)

  useEffect(() => {
    const auth_state = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        console.log("User signed in:");
        setTimeout(() => {

          window.location.href = "/"
        }, 3500);
      } else {
        console.log("User signed out");
      }
    });


    return () => auth_state();
  }, []);


  async function imageUploader() {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    "https://api.imgbb.com/1/upload?key=1a6652c53561ec237b0e9d6130ff5da1",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (data && data.success && data.data.url) {
    return data.data.url;
  } else {
    return "error"
  }
}


 async function signupnewuser() {
  isLoader(true);

  if (!name || !section || !year || !email || !password || !image) {
    setSignupError("Please fill in all the fields.");
    isLoader(false);
    return;
  }

  if (password.length < 6) {
    setSignupError("Password should be at least 6 letters");
    isLoader(false);
    return;
  }

  if (!isVerified) {
      setSignupError("Verify the image first")
      isLoader(false)
      return;
    }
    setSignupError(null);
    const url= await imageUploader()
    if(url!="error"){

      firebase.signupUserWithEmailAndPassword(email, password)
        .then( (e) => {
          firebase.addUser(name, e.user.uid, section, year, email, url || "url", new Date().toLocaleDateString())
          isLoader(false)
          setShowPopover2(true);
          setTimeout(() => setShowPopover2(false), 3500);
        })
        .catch((e) => {
          isLoader(false)
          setSignupError(e.message);
        });
    }
    else{
      setSignupError("Error uploading image, please try again")
    }
  }





  function SigninUser() {
    isLoader(true)
    firebase.signinUserWithEmailAndPassword(SigninEmail, SigninPassword)
      .then(() => {
        console.log(firebase.user);

        isLoader(false)
        setShowPopover(true); // Show popover
        setTimeout(() => {
          setShowPopover(false); // Hide popover after 2 sec
        }, 3500);
        setError(null)
      })
      .catch((e) => {
        isLoader(false)
        setError(e.message)
      });
  }



  const toggleToSignup = () => {
    setIsSignup(true)
    gsap.to("#left", {
      duration: 1,

    })
    gsap.to("#right", {
      duration: 1,
    })
  }

  const toggleToLogin = () => {
    setIsSignup(false)
    
  }


  return (
    <div className='authdiv h-[90vh]  flex bg-gradient-to-br from-indigo-900 via-black to-yellow-600 relative min-sm:overflow-hidden max-sm:overflow-x-hidden'>
      {/* Animated Gradient Circles Left */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-yellow-400 via-orange-500 to-purple-700 rounded-full blur-3xl opacity-30 animate-pulse z-0"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-purple-700 via-blue-500 to-yellow-400 rounded-full blur-3xl opacity-30 animate-pulse z-0"></div>
      {/* Animated Gradient Circles Right */}
      <div className="absolute top-1/2 left-[60%] -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-yellow-400 via-orange-500 to-purple-700 rounded-full blur-3xl opacity-20 animate-pulse z-0"></div>
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-gradient-to-br from-purple-700 via-blue-500 to-yellow-400 rounded-full blur-2xl opacity-20 animate-pulse z-0"></div>
      {/* Left Panel */}
      <div className='left-div max-sm:min-h-screen h-full w-full flex flex-col items-center justify-center gap-4 max-sm:gap-7 max-sm:relative z-10' id='left'>
        {isSignup ? (
          <>
           {showPopover2 && <Signout_Popover id="popover2" className=" min-sm:hidden" height={300} width={300} />}
            <h1 className='text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-700 text-center drop-shadow-lg mb-2 max-sm:p-4'>Create an Account</h1>
            {signuperror && <h2 className="text-red-600 text-center text-base font-semibold">{signuperror}</h2>}
            <div className='w-4/5 min-h-3/5 flex flex-col gap-5 items-center justify-center'>
              <input type="text" className='bg-black/50 w-4/5 h-12 rounded-2xl text-white p-3 focus:ring-2 focus:ring-yellow-400 outline-none transition' value={name} placeholder='Name' onChange={(e) => { setName(e.target.value) }} />
              <input type="text" className='bg-black/50 w-4/5 h-12 rounded-2xl text-white p-3 focus:ring-2 focus:ring-yellow-400 outline-none transition' value={section} placeholder='Section' onChange={(e) => { setSection(e.target.value) }} />
              <input type="text" className='bg-black/50 w-4/5 h-12 rounded-2xl text-white p-3 focus:ring-2 focus:ring-yellow-400 outline-none transition' value={year} placeholder='Passing Year' onChange={(e) => { setYear(e.target.value) }} />
              <input type="email" className='bg-black/50 w-4/5 h-12 rounded-2xl text-white p-3 focus:ring-2 focus:ring-yellow-400 outline-none transition' value={email} placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
              <input type="password" className='bg-black/50 w-4/5 h-12 rounded-2xl text-white p-3 focus:ring-2 focus:ring-yellow-400 outline-none transition' value={password} placeholder='Password (min 6 letters)' onChange={(e) => { setPassword(e.target.value) }} />
              <span className='text-yellow-400 text-center font-semibold'>Upload College ID Card (image or pdf)</span>
              <IDcardinput onVerified={handleVerification} onUpload={uploadImage} />
              {loader ? (
                <Image src={"/loader.svg"} height={60} width={60} alt="loader" />
              ) : (
                <Glowbutton title="Sign Up" onClick={signupnewuser} />
              )}
              <span className="text-white hidden max-sm:block">OR</span>
              <Defbutton title="Login" className="bg-white sm:hidden max-sm:block" onClick={toggleToLogin} />
            </div>
          </>
        ) : (
          <>
          {showPopover && <Signin_Popover id="popover" className=" min-sm:hidden" height={300} width={300} />}
            <h1 className='text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-700 text-center drop-shadow-lg mb-2'>Login to Your Account</h1>
            {error && <h2 className="text-red-600 text-center text-base font-semibold">Invalid Credentials</h2>}
            <div className='w-4/5 h-2/5 flex flex-col gap-5 items-center justify-center'>
              <input type="email" className='bg-black/60 w-4/5 h-12 rounded-2xl max-sm:w-5/6 text-white p-3 focus:ring-2 border-2 border-gray-600 focus:ring-yellow-400 outline-none transition' placeholder='Email' value={SigninEmail} onChange={e => setSigninEmail(e.target.value)} />
              <input type="password" className='bg-black/60 w-4/5 h-12 rounded-2xl max-sm:w-5/6 text-white p-3 focus:ring-2 border-gray-600 border-2 focus:ring-yellow-400 outline-none transition' placeholder='Password' value={SigninPassword} onChange={e => setSigninPassword(e.target.value)} />
              {loader ? (
                <Image src={"/loader.svg"} height={60} width={60} alt="loader" />
              ) : (
                <Glowbutton title="Login" onClick={SigninUser} />
              )}
              <span className="text-white hidden max-sm:block">OR</span>
              <Defbutton title="Sign Up" className="bg-white sm:hidden max-sm:block" onClick={toggleToSignup} />
            </div>
          </>
        )}
      </div>
      {/* Right Panel */}
      <div className='right-div overflow-x-hidden bg-black h-full w-full flex flex-col items-center justify-center relative z-10 gap-4 max-sm:hidden  shadow-2xl' id='right'>
        {/* Contrasting animated shapes */}
        <div className="absolute -top-24 right-10 w-96 h-96 bg-gradient-to-tr from-lime-500 via-green-600 to-cyan-800 rounded-full blur-2xl opacity-30 animate-pulse z-0"></div>
        <div className="absolute bottom-6 left-0 w-96 h-96 bg-gradient-to-br from-lime-600 via-green-600 to-cyan-800 rounded-full blur-2xl opacity-20 animate-pulse z-0"></div>
        {/* Content */}
        {isSignup ? (
          <>
            {showPopover2 && <Signout_Popover id="popover2" height={500} width={500} />}
            <h1 className='text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-600 via-cyan-800 to-gray-800 text-center drop-shadow-lg mb-2'>Welcome Back</h1>
            <h2 className='text-2xl font-normal text-center text-white/80 mb-4 relative z-10'>Already have an account? Login now</h2>
            <Defbutton title="Login" className="bg-white font-bold text-lg px-8 py-2 rounded-lg shadow hover:bg-blue-100 transition relative z-10" onClick={toggleToLogin} />
          </>
        ) : (
          <>
            {showPopover && <Signin_Popover id="popover" height={500} width={500} />}
            <h1 className='text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-600 via-cyan-800 to-gray-800 text-center drop-shadow-lg mb-2'>New Here?</h1>
            <h2 className='text-2xl font-normal text-center text-white mb-4 relative z-10'>Sign Up and Discover The Marketplace</h2>
            <Defbutton title="Sign Up" className="bg-white font-bold text-lg px-8 py-2 rounded-lg shadow hover:bg-blue-100 transition relative z-10" onClick={toggleToSignup} />
          </>
        )}
      </div>
    </div>
  )
}

export default Login
