import React from 'react'
import corruption from '../assets/corruption.webp'
import no_corruption from '../assets/no_corruption.webp'
import HowItWorks from './HowItWorks'

function Home() {
  return (
    <div> 
        <div className='bg-color-blue bg-hero-pattern ' >
            <div className=' flex flex-col flex-wrap w-11/12 m-auto'>

              <div className='flex h-64 rounded-lg justify-start'>
                  <img className=' mt-4 shadow-lg rounded-3xl' src={corruption} alt='corruption'/>
                  
              </div>

              <div className='flex h-50 flex-wrap flex-col  text-center font-semibold leading-normal justify-center text-6xl  '>
                <h1>Report To Help <br/> Fight Corruption </h1>
              </div>

              <div className='flex h-64 rounded-lg justify-end'>
                  <img className='shadow-lg rounded-3xl mb-4' src={no_corruption} alt='no_corruption'/>
              </div>
            
            </div>
            
        
        
        </div>
      <HowItWorks/>
    </div>
  )
}

export default Home;