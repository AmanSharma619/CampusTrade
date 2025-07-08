"use client"
import React, { useState, createContext, use, useEffect, cache, } from 'react'
import "./marketplace.css"
import Item from '@/components/Item'
import SellForm from '@/components/SellForm'
import RequestForm from '@/components/RequestForm'
import Utilbox from '@/components/Utilbox'
import Script from 'next/script'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


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
        <div className='flex flex-col linear mark min-h-screen bg-gradient-to-br from-blue-900 via-black to-indigo-900'>

          {showForm && (
            <SellForm setShowForm={setShowForm} />
          )}
          {
            showRequestForm && (
              <RequestForm setShowRequestForm={setShowRequestForm} />
            )
          }
          <Utilbox setShowForm={setShowForm} setShowRequestForm={setShowRequestForm} />
          {loading ?  (
  <div className="lower bg-transparent h-full w-full flex max-sm:justify-between p-3 gap-7 flex-wrap">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="w-[280px] h-[220px] p-4 bg-white/5 border border-white/10 rounded-xl shadow-md backdrop-blur-md space-y-3">
        <Skeleton height={20} width="80%" baseColor="#1f2937" highlightColor="#374151" />
        <Skeleton height={15} width="60%" baseColor="#1f2937" highlightColor="#374151" />
        <Skeleton height={10} width="90%" baseColor="#1f2937" highlightColor="#374151" />
        <Skeleton height={10} width="75%" baseColor="#1f2937" highlightColor="#374151" />
      
          <Skeleton height={30} width={70} baseColor="#1f2937" highlightColor="#374151" />
          <Skeleton height={30} width={70} baseColor="#1f2937" highlightColor="#374151" />
      </div>
    ))}
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
                  <Item key={item._id} userID={item.userID} title={item.item} name={item.name} section={item.section} action={item.action} description={item.description} image={item.image} date={formattedDate} />
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