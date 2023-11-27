import { Link, Outlet } from 'react-router-dom'
import Footer from './Footer'
import { FaHandBackFist } from "react-icons/fa6";

function Landing() {
  return (
    <div>
        <div className='rounded-lg flex flex-row mt-4 bg-color-primary p-3'>
            <div className='flex flex-row p-1 text-2xl ml-2 '>
                <FaHandBackFist className='text-color-tertiary text-4xl'/>
                <h1 className='font-semibold'> I-Reporter</h1>    
            </div>

            <div className='flex w-3/4 justify-around p-1 font-semibold '>
                <Link className='inline-block border rounded-lg  hover:border-gray-200 hover:bg-color-tertiary py-1 px-3' to='/home'>Home</Link>
                <Link className='inline-block border rounded-lg  hover:border-gray-200 hover:bg-color-tertiary  py-1 px-3'to='/home'>Home</Link>
                <Link className='inline-block border rounded-lg  hover:border-gray-200 hover:bg-color-tertiary  py-1 px-3' to='/home'>Home</Link>
                <Link className='inline-block border rounded-lg  hover:border-gray-200 hover:bg-color-tertiary  py-1 px-3' to='/home'>About</Link>
                <Link className='inline-block border rounded-lg  hover:border-gray-200 hover:bg-color-tertiary  py-1 px-3' to='/home'>LogIn</Link>
                
            </div>
        </div>
        <Outlet></Outlet>
        <Footer/>
    
    </div>
  )
}

export default Landing