
import React from 'react'
import "./marketplace.css"
import Item from '@/components/Item'
import Utilbox from '@/components/Utilbox'
import { Defbutton } from '@/components/Button'
const page = () => {

  return (
    <div className='flex  linear mark min-h-screen'>
      <div className="left">
        <Utilbox/>
      </div>

      <div className='flex flex-col right'>
        <div className='w-full h-[10vh] flex items-center'> 
         
          
      <span className='flex gap-5 float-left '>

<button className="btn">
      Sell/Lend 
    </button>

<button className="btn">
      Request 
    </button>
      </span>
        </div>

      <div className='lower bg-transparent h-full w-full flex flex-wrap justify-around p-3 gap-7 '>

        <Item title="Calculator" name="Aman Sharma" section="S1" action="Requested" />
        <Item title="Calculator" name="Aman Sharma" section="S1" action="Lending" />
        <Item title="Calculator" name="Aman Sharma" section="S1" action="Selling" />
      </div>

      </div>
    </div>
  )
}

export default page