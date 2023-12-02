import { Link, Outlet} from 'react-router-dom'
import Footer from './Footer'
import { FaHandBackFist } from "react-icons/fa6";
import { SiWelcometothejungle } from "react-icons/si";



function Navbar({user,handleLogOut}) {
  
  return (
    <div className='bg-color-tertiary rounded-lg h-16 '>
        <div className='rounded-sm flex flex-row mt-1 mb-1  w-11/12 m-auto p-3'>
            <div className='flex flex-row p-1 text-2xl w-1/3 text-color-white '>
                <FaHandBackFist className='text-color-white text-3xl'/>
                <h1 className='font-semibold'> I-Reporter</h1>    
            </div>


            <div className='flex flex-row m-auto  w-3/4 justify-around items-end content-end p font-semibold text-color-white '>
                <Link className='rounded-lg hover:bg-color-blue2 hover:text-color-black py-2 px-2' to='/home'>Home</Link>
                <Link className='rounded-lg  hover:bg-color-blue2 py-2 px-2' to='/home'>About</Link>

                {user? (
                <div>
                  <button className=' rounded-lg bg-color-tertiary hover:bg-color-blue2 py-2 px-2' onClick={handleLogOut}>LogOut</button>
                </div>):
                <Link className='rounded-lg hover:bg-color-blue2 py-2 px-2' to='/login'>LogIn</Link>}

                {user?(
                  <div className='flex text-sem text-2xl p-1'>
                    <SiWelcometothejungle className='text-3xl'/>
                    <p className=''> elcome, {user.username}</p>
                  </div>
                ):
                <p></p>}

            </div>
        </div>
        <Outlet></Outlet>
        <Footer/>
    
    </div>
  )
}

export default Navbar