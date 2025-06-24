"use client"
import React, { useState, createContext, use, useEffect, cache, } from 'react'
import "./marketplace.css"
import Item from '@/components/Item'
import SellForm from '@/components/SellForm'
import RequestForm from '@/components/RequestForm'
import Utilbox from '@/components/Utilbox'
import Script from 'next/script'
export const FilterContext = createContext()
const Marketplace = () => {
  const [params, setParams] = useState(["Requested", "Selling", "Lending"])
  const [showForm, setShowForm] = useState(false)
  const [showRequestForm, setShowRequestForm] = useState(false)

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      let res = await fetch("/api/items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        cache : "no-cache",
      })
      const resdata = await res.json()
      setData(resdata)
      setLoading(false);
    }

    getData()
  }, [])

  const dummyData = [
    {
      id: "1",
      description: "A basic calculator for daily use, in good condition.",
      title: "Calculator",
      name: "Aman Sharma",
      section: "S1",
      action: "Requested"
    },
    {
      id: "2",
      description: "A basic calculator for daily use, in good condition.",
      title: "Calculator",
      name: "Palak Bansal",
      section: "S1",
      action: "Lending"
    },
  ]
  return (
    <>


      <FilterContext.Provider value={{ params, setParams }}>
        <div className='flex flex-col  linear mark min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900'>

          {showForm && (
            <SellForm setShowForm={setShowForm} />
          )}
          {
            showRequestForm && (
              <RequestForm setShowRequestForm={setShowRequestForm} />
            )
          }
          <Utilbox setShowForm={setShowForm} setShowRequestForm={setShowRequestForm} />
          {loading ? (
            <div className="flex flex-col items-center justify-center w-full h-[40vh]">
              <svg className="animate-spin h-12 w-12 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="text-white text-lg font-semibold">Loading items...</span>
            </div>
          ) : (
            <div className='lower bg-transparent h-full w-full flex  max-sm:justify-between p-3 gap-7 flex-wrap'>
              {data.filter(item => params.indexOf(item.action) !== -1).map(item => {
                const formattedDate = new Date(item.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });
                return (
                  <Item key={item._id} title={item.item} name={item.name} section={item.section} action={item.action} description={item.description} image={item.image} date={formattedDate} />
                );
              })}
              {data.length === 0 && <div className="text-white">No data found at the moment</div>}
            </div>
          )}
        </div>
      </FilterContext.Provider>

    </>
  )
}

export default Marketplace