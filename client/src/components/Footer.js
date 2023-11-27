import React from 'react'
import { FooterDetails } from './FooterDetails'

function Footer() {
  return (
    <div>
        <div className='bg-color-gray mt-2 rounded-lg'>
        <div className=' m-auto justify-evenly flex flex-row flex-wrap '>  
            {FooterDetails.map((footer,idx)=>(
                <div key={idx} className=" max-w-sm my-8 overflow-hidden  p-2">

                    <div className='text-2xl flex  items-center '>
                        <p className='rounded-lg overflow-hidden ml-4 border border-color-tertiary p-2'> {footer.title} </p>
                    </div>

                    <div className="px-6 text-xl py-4 text-white leading-normal ">
                        <p> {footer.point1} </p>
                        <p> {footer.point2} </p>
                        <p> {footer.point3} </p>
                        <p> {footer.point4} </p>
                        <p> {footer.point5} </p>
                    </div>   

                </div> 
            ))}
        </div>

        </div>
    </div>
  )
}

export default Footer