"use client"
import React from 'react'
import "./Card.css"
import { Recycle,ShieldCheck,MessageSquareMore,Bell,SlidersHorizontal } from 'lucide-react'
const Card = () => {
     const data=[
        {
           icon: <ShieldCheck size={40}/>,
            title: "College Exclusive" ,
            desc:" Only students with verified university codes can join, ensuring a safe and local trading community."
        },
        {
            icon:<MessageSquareMore size={40}/>,
             title: "In-App Chat" ,
            desc:"Communicate with students through real time chat to discuss product details, prices, meet-up times, or negotiations"
        },
        {
          icon:<Recycle size={40}/>,
             title: "Borrow Instead" ,
            desc:" Rather than buying expensive new items such as a scientific calculator, borrow one for the time being."

        },
        {
          icon:<Bell size={40}/>,
             title: "Real-Time Notifications" ,
            desc:"Get alerts for new listings, chat messages, and updates on your trades."

        },
        {
          icon:<SlidersHorizontal size={40}/>,
             title: "Search & Filter" ,
            desc:"Find exactly what you're looking for with advanced search and filters ."

        }
     ]
  return (
    <div className="container flex justify-evenly gap-8 flex-wrap">
    {data.map((item, index) => (
      <div
        key={index}
        className="bg-color2 w-[25vw] h-[40vh] rounded-xl flex flex-col items-center justify-start py-8 px-5 card"
      >
        <div className="flex flex-col items-center gap-6 h-full justify-start">
          <div className="icon text-center">{item.icon}</div>
          <div className="text flex flex-col gap-3 text-center">
            <h1 className="text-3xl font-bold">{item.title}</h1>
            <h2 className="text-lg">{item.desc}</h2>
          </div>
        </div>
      </div>
    ))}
  </div>
  
  )
}

export default Card