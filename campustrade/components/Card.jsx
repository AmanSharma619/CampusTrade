"use client"
import React from 'react'
import { Recycle,ShieldCheck } from 'lucide-react'
const Card = () => {
     const data=[
        {
           icon: <ShieldCheck size={40}/>,
            title: "College Exclusive" ,
            desc:" Only for your college"
        },
        {
            icon:<Recycle size={40}/>,
             title: "Borrow not buy" ,
            desc:" Instead of buying new, borrow"
        },
        {
             title: "Connect with people" ,
            desc:" connect with people from your campus"

        }
     ]
  return (
    <div className='container flex justify-evenly gap-7 '>
        {data.map((item, index) => (
 <div className='bg-color2 w-[27vw] h-[40vh] rounded-xl flex flex-col justify-between py-8 px-5'>
<div className='icon'>
{item.icon}
</div>
<div className='text flex flex-col gap-3'>
<h1 className='text-2xl'>{item.title}</h1>
<h2>{item.desc}</h2>
</div>
 </div>
))}

    </div>
  )
}

export default Card