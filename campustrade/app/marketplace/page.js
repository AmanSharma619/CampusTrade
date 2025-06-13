"use client"
import React ,{useState,createContext, }from 'react'
import "./marketplace.css"
import Item from '@/components/Item'
import SellForm from '@/components/SellForm'
import Utilbox from '@/components/Utilbox'
import Script from 'next/script'
export const FilterContext = createContext()
const Marketplace = () => {
  const [params,setParams]=useState(["Requested","Selling","Lending"])
  const [showForm,setShowForm]=useState(false)

  const data=[
    {
      id:"1",
      description:"A basic calculator for daily use, in good condition.",
      title:"Calculator",
      name:"Aman Sharma",
      section:"S1",
      action:"Requested"
    },
    {
      id:"2",
       description:"A basic calculator for daily use, in good condition.",
      title:"Calculator",
      name:"Palak Bansal",
      section:"S1",
      action:"Lending"
    },
    {
      id:"3",
       description:"A basic calculator for daily use, in good condition.",
      title:"Calculator",
      name:"Naman Bansal",
      section:"S1",
      action:"Selling"
    },
    {
      id:"4",
       description:"A basic calculator for daily use, in good condition.",
      title:"Calculator",
      name:"Naman Bansal",
      section:"S1",
      action:"Selling"
    },
    {
      id:"5",
       description:"A basic calculator for daily use, in good condition.",
      title:"Calculator",
      name:"Naman Bansal",
      section:"S1",
      action:"Selling"
    }
  ]
  return (
 <>



<FilterContext.Provider value={{params,setParams}}>
    <div className='flex flex-col  linear mark min-h-screen'>
      
      {showForm && (
       <SellForm setShowForm={setShowForm}/>
)}

     <Utilbox setShowForm={setShowForm} />

      <div className='lower bg-transparent h-full w-full flex flex-wrap justify-around p-3 gap-7 '>
        
        {
          data.map((item)=>{
            if(params.indexOf(item.action)!=-1){
              return (
                <Item key={item.id} title={item.title} name={item.name} section={item.section} action={item.action} description={item.description}/>
              )
            }
          }
          
        )
      }
      </div>
      </div>
      </FilterContext.Provider>
      
      </>
  )
}

export default Marketplace