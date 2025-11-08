import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt=''/>
            <p className='w-full md:w-2/3 text-gray-600'>
                Orem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae ultrices neque.
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+6012 345 6789</li>
                <li>contac@forever.com.my</li>
            </ul>
        </div>
      </div>
      
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ forever.com.my - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
