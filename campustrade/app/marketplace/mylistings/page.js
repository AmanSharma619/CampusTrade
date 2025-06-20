"use client"
import React, { useEffect, useState } from 'react'
import Item from '@/components/Item'
import './mylistings.css'
import { UseFirebase } from '@/auth/firebase'

const MyListings = () => {
    const userID = UseFirebase().user.uid    
  const [myListings, setMyListings] = useState([])

  useEffect(() => {
    async function fetchListings() {
      
      const res = await fetch(`/api/mylistings?userID=${userID}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: "no-cache"
      })
      const data = await res.json()
      setMyListings(data)
    }
    fetchListings()
  }, [])

  return (
    <div className='flex flex-col linear mark min-h-screen items-center '>
      <h2 className='text-4xl font-bold text-white  my-6 mx-auto text-center'>Your Listings</h2>
      <div className='lower bg-transparent h-full w-full flex  max-sm:justify-between p-3 gap-7 flex-wrap'>
        {myListings.length > 0 ? (
          myListings.map((item) => {
            const formattedDate = new Date(item.createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
            return (
              <Item
                key={item._id}
                id={item._id}
                title={item.item}
                name={item.name}
                section={item.section}
                action={item.action}
                description={item.description}
                image={item.image}
                date={formattedDate}
                delete
              />
            )
          })
        ) : (
          <div className='text-white text-lg text-center w-full mt-10'>No listings found.</div>
        )}
      </div>
    </div>
  )
}

export default MyListings