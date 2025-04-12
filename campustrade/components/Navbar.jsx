import React from 'react'
import Image from 'next/image'
const Navbar = () => {
  return (
    <div className='navbar flex justify-between py-7 text-2xl text-white px-10  '>
        <span>
            <Image src="/file.svg" width={10} height={10} alt='logo'/>
            Logo</span>
        <ul className='flex gap-7'>
            <li>Home</li>
            <li>Marketplace</li>
            <li>Chats</li>
            <li>About Me</li>
        </ul>

        <span className='flex gap-3 '>
            <button>Login</button>
        </span>
        
    </div>
  )
}

export default Navbar