"use client"
import "./Footer.css"
import Image from 'next/image'
import React from 'react'
import { Github ,Linkedin, Mail,Copy} from 'lucide-react'
const Footer = () => {
  function copy_mail(){
    navigator.clipboard.writeText("aman.sharma004@adgitmdelhi.ac.in");
    document.getElementById("copy").style.display="block"
    setTimeout(()=>{
      document.getElementById("copy").style.display="none"
    },2000)
  }
  return (
  



<footer class="bg-black sticky" id='foot'>
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8 footer-main">
        <div class="sm:flex sm:items-center sm:justify-between  trademark">
         

            <a href="https://campus-trade-alpha.vercel.app/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <Image src={"/logo.png"} width={30} height={30}/>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CampusTrade</span>
            </a>
         
            <ul class="flex flex-wrap gap-3 items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <span id='copy' className='w-[7vw] h-[5vh] bg-foreground text-white rounded-3xl text-center p-2 hidden '>Copied !</span>
              <a href="https://github.com/AmanSharma619/CampusTrade">

                <li>
                   <Github size={35}/>
                </li>
              </a>
              <a href="https://www.linkedin.com/in/aman-sharma-4a3166284/">
                <li>
                    <Linkedin size={35}/>
                </li>
              </a>
             
                <li className='cursor-pointer' onClick={copy_mail}>
                   <Mail size={35} />
                  
                </li>
              
              
            </ul>
            
        </div>
       
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-md text-gray-500 sm:text-center dark:text-gray-400 text-center">Made With ❤️ by Aman Sharma</span>
    </div>
</footer>




  )
}

export default Footer