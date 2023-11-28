import React from 'react'
import corruption from '../assets/corruption.webp'
import no_corruption from '../assets/no_corruption.webp'
import Todo from '../assets/Todo.gif'

function Home() {
  return (
    <div className='bg-color-secondary rounded-lg'>
        <div className=' flex flex-col flex-wrap w-11/12 m-auto'>

          <div>
              <img className=' mt-4 shadow-lg rounded-3xl w-2/6' src={corruption} alt='corruption'/>
              
          </div>

          <div className='flex flex-col flex-wrap ml-8 text-center font-semibold leading-normal justify-center text-6xl text-white'>
            <h1>Report To Help </h1>
            <h1>Fight Corruption!</h1>
          </div>

          <div className='flex rounded-lg justify-end'>
              <img className='shadow-lg rounded-3xl mb-4' src={no_corruption} alt='no_corruption'/>
          </div>
        
        </div>
    
    
    </div>
  )
}

export default Home