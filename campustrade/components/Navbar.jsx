"use client"
import "./Navbar.css"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { User } from "lucide-react"
import { Poppins } from 'next/font/google'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import Link from "next/link"
const font_inter = Poppins({
  variable: "--inter",
  weight: ['300', '400', '700'],
  subsets: ["latin"],
});

const Navbar = () => {
  const auth = getAuth()
  const user = auth.currentUser
  const [currUser, setUser] = useState(user)
  const [name,setName]=useState(null)
const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const auth_state = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
       console.log("Signed in",user);
       
         let user_name = user.email.split(".")[0];
         setName(user_name)
        
      } else {
        console.log("User signed out");
      }
    });


    return () => auth_state();
  }, []);

  if (currUser) {
    return (
      <>
        <nav className={` ${font_inter.className} bg-white dark:bg-black sticky z-20 top-0 start-0 border-b-2 border-gray-700 dark:border-gray-600`}>
          <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="logo">
                <Image src={"/logo.png"} id="logo" width={50} height={50} alt="logo" />
              </span>
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white title">CampusTrade</span>
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

{/* User button */}

             <div className="relative inline-block text-left">
  <div>
    <button
      type="button"
      className=" inline-flex items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm  font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      onClick={() => setDropdownOpen((prev) => !prev)}
      aria-expanded={isDropdownOpen}
      aria-haspopup="true"
      id="but"
    >
     <User size={20}/>
      {name || "user"}
      <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
      </svg>
    </button>
  </div>

  {isDropdownOpen && (
    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu">
      <div className="py-1" role="none" id="drop">
        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Account settings</a>
        <button onClick={() => {
          setDropdownOpen(false)
          let a =confirm("Are you sure you want to sign out?")
          if(a==1){
            signOut(auth)
          }
        }} className="block w-full px-4 py-2 text-left text-sm text-red-500 cursor-pointer" role="menuitem">Sign out</button>
      </div>
    </div>
  )}
</div>

              <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-transparent  dark:border-gray-700 text-xl">
                <li>
                  <Link href="/" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-foreground  md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</Link>
                </li>
                <li>
                  <Link href="/marketplace" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-foreground  md:dark:hover:bg-transparent dark:border-gray-700">Marketplace</Link>
                </li>
                <li>
                  <Link href="" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-foreground  md:dark:hover:bg-transparent dark:border-gray-700">My Chats</Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </>

    )
  }


  return (

    <>
      <nav className={` ${font_inter.className} bg-white dark:bg-black sticky z-20 top-0 start-0 border-b-2 border-gray-700 dark:border-gray-600`}>
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="logo">
              <Image src={"/logo.png"} id="logo" width={50} height={50} alt="logo" />
            </span>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white title">CampusTrade</span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link href={"/login"}>
              <button type="button" className="text-white bg-foreground hover:bg-color1 duration-200 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2 text-center login ">Login/Sign Up</button>
            </Link>
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-transparent  dark:border-gray-700 text-xl">
              <li>
                <Link href="/" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-foreground  md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</Link>
              </li>
              <li>
                <Link href="/marketplace" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-foreground  md:dark:hover:bg-transparent dark:border-gray-700">Marketplace</Link>
              </li>
              <li>
                <Link href="" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-foreground  md:dark:hover:bg-transparent dark:border-gray-700">My Chats</Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>

  )
}

export default Navbar