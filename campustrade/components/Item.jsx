"use client"
import "./item.css"
import Image from 'next/image'
import React, { useState } from 'react'
import { Defbutton } from "./Button"

const Item = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  async function handleDelete(e) {
    e.stopPropagation()
    const confirmDelete = confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return
    try{
      let res=await fetch(`/api/mylistings?id=${props.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      let result = await res.json();
      if(res.ok){
        alert("Item deleted successfully");
        window.location.reload();
      }
      else{
        alert("Failed to delete item: " + result.error);
      }
    }
    catch (error) {
    console.error("Error deleting item:", error); 
    alert("Failed to delete item. Please try again later.");
  }  
}
  if (showDetails) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181c24]/70 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative text-black max-sm:p-4">
          <button
            className="absolute top-2 right-2 text-sm bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => setShowDetails(false)}
          >
            Close
          </button>
          <div className='relative w-[80%] max-sm:w-[90%] h-48 rounded-xl mb-4 mx-auto'>
            <Image src={props.image} alt="image" fill style={{ objectFit: 'contain', width: '100%' }} />
          </div>
          <div className='flex items-center gap-2 mb-2'>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                ${props.action === "Requested" || props.action === "requested" ? "bg-green-100 text-green-700" :
                props.action === "Lending" || props.action === "lending" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"}`}>
              {props.action}
            </span>

          </div>
          <h1 className='text-2xl font-bold mb-2'>{props.title}</h1>
          <h2 className="mb-3">{props.description}</h2>

          <h2 className='text-lg '>Posted by: </h2>
          <div className="flex justify-between">
            <h2 className='text-lg font-semibold  text-purple-800'>{props.name} {props.section}</h2>
            <h2 className='text-lg font-semibold  text-purple-800'>{props.date}</h2>
          </div>
          
          <Defbutton title="Chat Now" className="bg-black w-full chatbut text-white hover:text-purple-600 text-sm hover:scale-105 transition duration-200 border-2 border-purple-800 mt-2" />
        </div>
      </div>
    );
  }

  return (
    <div
      className='min-w-[17vw] mx-auto max-w-[20vw] backdrop-blur-xl max-sm:max-w-[42vw] min-sm:min-h-[45vh] max-sm:h-[35vh] bg-tranparent rounded-xl flex flex-col p-2 gap-2 max-sm:gap-0.5 flex-wrap justify-evenly text-white item hover:scale-105 transition duration-200 border-0 border-white cursor-pointer'
      onClick={() => setShowDetails(true)}
    >

      <div className='relative w-full h-[50%] max-sm:h-[45%] rounded-xl'>
        <Image src={props.image} alt="image" fill style={{ objectFit: 'contain', width: '100%' }} />
      </div>
      <div className='flex items-center gap-1.5 flex-wrap max-sm:flex-col max-sm:items-start'>
        <h1 className='text-2xl max-sm:whitespace-nowrap max-sm:text-lg '>
          {props.title.length <= 10 ? props.title : props.title.slice(0, 9) + "..."}
        </h1>

        <span className={`px-2 py-1 rounded-full text-xs font-semibold 
        ${props.action === "Requested" || props.action === "requested" ? "bg-green-100 text-green-700" :
            props.action === "Lending" || props.action === "lending" ? "bg-yellow-100 text-yellow-700" :
              "bg-red-100 text-red-700"}`}>
          {props.action}
        </span>
      </div>

      <div className=" max-sm:w-full max-sm:gap-2 max-sm:items-center ">
        {!props.delete ?<span className="flex gap-2">
          <h2 className='text-lg max-sm:text-sm'>{props.name}</h2>
          <h2 className='text-lg max-sm:text-sm'>{props.section}</h2>
          {/* <h2 className='text-xl max-sm:text-sm'>{props.section}</h2> */}
        </span> : null}
        <h2 className="text-gray-300 max-sm:text-sm">{props.date}</h2>
      </div>
      <div className="w-full flex justify-center ">
        {!props.delete ?<Defbutton title="Chat Now" className="bg-transparent max-sm:hidden w-full chatbut  text-white hover:text-purple-600 text-sm hover:scale-105 transition duration-200 border-0 border-purple-800">
        </Defbutton> :
          <Defbutton title="Delete" className="bg-red-500 w-full chatbut text-white  text-sm hover:scale-105 transition duration-200 border-0 border-purple-800" onClick={handleDelete}/>
         }
       
      </div>

    </div>
  )
}


export default Item