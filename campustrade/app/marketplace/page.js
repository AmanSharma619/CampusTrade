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

  useEffect(() => {
    async function getData() {
      let res = await fetch("/api/items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }, cache = "force-cache")
      const resdata = await res.json()
      setData(resdata)


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
        <div className='flex flex-col  linear mark min-h-screen'>

          {showForm && (
            <SellForm setShowForm={setShowForm} />
          )}
          {
            showRequestForm && (
              <RequestForm setShowRequestForm={setShowRequestForm} />
            )
          }

          <Utilbox setShowForm={setShowForm} setShowRequestForm={setShowRequestForm} />

          <div className='lower bg-transparent h-full w-full flex flex-wrap justify-around p-3 gap-7 '>

            {
              data.map((item) => {
                const formattedDate = new Date(item.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });
                if (params.indexOf(item.action) != -1) {
                  return (
                    <Item key={item._id} title={item.item} name={item.name} section={item.section} action={item.action} description={item.description} image={item.image} date={formattedDate} />
                  )
                }
              }

              )
            }
            {
              !data && <div> No data found at the moment</div>
            }
          </div>
        </div>
      </FilterContext.Provider>

    </>
  )
}

export default Marketplace