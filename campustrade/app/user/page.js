"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { UseFirebase } from '@/auth/firebase'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"

const User = () => {
  const firebase = UseFirebase()
  const [name,setName] = useState(null)
  const [section,setSection] = useState(null) 
  const [passYear,setPassYear] = useState(null)
  const [joined,setJoined] = useState(null)
  const [email,setEmail] = useState(null)
  const [photoURL,setPhotoURL] = useState(null)

  const auth = getAuth()
  useEffect(() => {
    async function getUserData() {
      const data = await firebase.getUserByUID(firebase.user.uid);
      setName(data.Name);
      setSection(data.Section);
      setPassYear(data.PassYear);
      setJoined(data.Joined);
      setEmail(data.Email);
      setPhotoURL(data.PhotoURL);
    }
    getUserData();
  
}, []);

  return (
    <div className='min-w-screen min-h-screen bg-gradient-to-br from-yellow-500 via-black to-orange-900 flex flex-col items-center py-10'>
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center w-[35%] max-sm:w-[75%] max-w-full">
        <div className="relative mb-4">
          <Image src={ photoURL} alt="User Avatar" width={200} height={200} className="rounded-full border-4 border-purple-400 shadow-lg object-cover object-center" />
        </div>
        <h1 className='text-3xl font-bold text-purple-700 mb-1 text-center max-sm:text-2xl'>{name || "Name"}</h1>
        <p className='text-gray-700 mb-2'>{email || "Email"}</p>
        <span className='bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-4'>Student</span>
        <div className="w-full flex flex-col gap-2 mb-4">
          <div className="flex justify-between text-gray-800">
            <span className="font-semibold">Section:</span>
            <span>{section || "Section"}</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span className="font-semibold">Pass Year:</span>
            <span>{passYear || "Pass Year"}</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span className="font-semibold">Joined:</span>
            <span>{joined || "Joined"}</span>
          </div>
        </div>
        <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold cursor-pointer shadow hover:bg-red-700 hover:scale-105 transition mb-2" onClick={()=>{
          let a=confirm("Are you sure you want to log out?")
          if(a==1){
             localStorage.removeItem("userData");
             signOut(auth)
          }
        }}>Log Out</button>
        <button className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold cursor-pointer shadow hover:bg-gray-900 hover:scale-105 transition">Delete Account</button>
      </div>
    </div>
  )
}

export default User