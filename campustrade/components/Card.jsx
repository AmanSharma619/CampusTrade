"use client"
import React ,{useEffect,useRef} from 'react'
import "./Card.css"
import { Recycle,ShieldCheck,MessageSquareMore,Bell,SlidersHorizontal } from 'lucide-react'
const Card = () => {
  const hasAnimatedRef = useRef(false);
 useEffect(() => {
    if (hasAnimatedRef.current) return;

  hasAnimatedRef.current = true;
  gsap.set(".card", {
    transformPerspective: 1000,
    transformStyle: "preserve-3d"
  });
 gsap.utils.toArray(".card").forEach((card) => {
    gsap.from(card, {
      rotateX: 90,
      y: 100,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%", 
        toggleActions: "play none none none"
      }
    });
  });
}, []);

     const data=[
        {
           icon: <ShieldCheck size={70}/>,
            title: "College Exclusive" ,
            desc:" Only students with verified university codes can join, ensuring a safe and local trading community."
        },
        {
            icon:<MessageSquareMore size={70}/>,
             title: "In-App Chat" ,
            desc:"Communicate with students through real time chat to discuss product details, prices, meet-up times, or negotiations"
        },
        {
          icon:<Recycle size={70}/>,
             title: "Borrow Instead" ,
            desc:" Rather than buying expensive new items such as a scientific calculator, borrow one for the time being."

        },
        {
          icon:<Bell size={70}/>,
             title: "Real-Time Notifications" ,
            desc:"Get alerts for new listings, chat messages, and updates on your trades."

        },
        {
          icon:<SlidersHorizontal size={70}/>,
             title: "Search & Filter" ,
            desc:"Find exactly what you're looking for with advanced search and filters ."

        }
     ]
  return (
    <div className="container flex justify-evenly gap-8 flex-wrap">
    {data.map((item, index) => (
      <div
        key={index}
        className="bg-transparent w-[25vw] h-[40vh] rounded-xl flex flex-col items-center justify-start py-8 px-5 card"
      >
        <div className="flex flex-col items-center gap-6 h-full justify-start text-white">
          <div className="icon text-center card-icon">{item.icon}</div>
          <div className="text flex flex-col gap-3 text-center">
            <h1 className="text-3xl font-normal card-title">{item.title}</h1>
            <h2 className="text-lg font-light card-desc">{item.desc}</h2>
          </div>
        </div>
      </div>
    ))}
  </div>
  
  )
}

export default Card