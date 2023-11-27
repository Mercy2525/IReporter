import React from 'react'
import { BsFacebook } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitter } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

function Footer() {
    const FooterDetails=[
        {
            title:'About',
            point1: 'About I-Reporter',
            point2: 'News',
            point3: 'Get Involved',
            point4: 'What is corruption?'
        },
        {
            title:'Our Work',
            point1: 'Social Justice',
            point2: 'Discrimination',
            point3: 'Asylum Seekers',
            point4: 'Human Rights',
            // point5: 'Contact'
        },
        {
            title:'Complaints',
            point1: 'Make a complaint',
            point2: 'Complaint Information',
            point3: 'How I-report works',
            point4: 'Response to Complaints'
        },
        {
            title:'Socials',
            point1: <p className='flex'> <BsFacebook className='text-3xl p-1'/> Facebook </p> ,
            point2: <p className='flex'> <RiInstagramFill className='text-3xl p-1'/> Instagram </p>,
            point3: <p className='flex'> <BsTwitter className='text-3xl p-1'/> Twitter </p>,
            point4: <p className='flex'> <MdEmail className='text-3xl p-1'/> Email Us</p>
        }
        ]

  return (
    
    <footer className="bg-color-gray py-4 w-full sm:fixed sm:bottom-0  ">

        <div className='mt-2 rounded-lg'>

            <div className=' m-auto justify-evenly flex flex-row flex-wrap  '>  
                {FooterDetails.map((footer,idx)=>(
                    <div key={idx} className=" max-w-sm my-8 overflow-hidden p-2  ">

                        <div className='text-2xl flex  items-center '>
                            <p className='rounded-lg overflow-hidden ml-4 border border-color-tertiary p-2'> {footer.title} </p>
                        </div>

                        <div className="px-6 text-xl py-4 text-white leading-8 ">
                            <p> {footer.point1} </p>
                            <p> {footer.point2} </p>
                            <p> {footer.point3} </p>
                            <p> {footer.point4} </p>
                        </div>   

                    </div> 
                ))}
            </div>

        </div>
    </footer>
    
  )
}

export default Footer