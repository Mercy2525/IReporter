import React from 'react'
import corruption from '../assets/corruption.webp'
import no_corruption from '../assets/no_corruption.webp'

function Home() {
  return (
    <div>
        <div className='bg-color-secondary max-h-full rounded-lg flex flex-row flex-wrap sm:flex-col sm:flex-wrap'>

        <img className='rounded-lg p-3 ml-10' src={corruption} alt='corruption'/>
        <img className='rounded-lg p-3 ml-10' src={no_corruption} alt='no_corruption'/>
    
        
        </div>
    
    
    </div>
  )
}

export default Home