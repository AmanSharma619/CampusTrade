import React from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
const font_inter = Inter({
  variable: "--inter",
  weight: ['300','400', '700'],
  subsets: ["latin"],
});

const Navbar = () => {
  return (
    
<>
<nav className={` ${font_inter.className} bg-white dark:bg-background sticky z-20 top-0 start-0 border-b-2 border-gray-200 dark:border-gray-600`}>
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">CampusTrade</span>
  </a>
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button type="button" className="text-white bg-foreground hover:bg-color1 duration-200 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2 text-center ">Login/Sign Up</button>
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-transparent  dark:border-gray-700 text-xl">
      <li>
        <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-foreground  md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-foreground  md:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-foreground  md:dark:hover:bg-transparent dark:border-gray-700">My Chats</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-foreground  md:dark:hover:bg-transparent dark:border-gray-700">About Me</a>
      </li>
    </ul>
  </div>
  </div>
</nav>
</>

  )
}

export default Navbar