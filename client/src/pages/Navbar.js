import { Link, Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { FaHandBackFist } from "react-icons/fa6";
import { useSnackbar } from 'notistack';
import Button from '../Components/Button'


function Navbar({user}) {
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar();


  function handleHeaderClick(){
      navigate('/home')
  }

  function handleLogOutClick(){
      fetch('/logout',
      {
          method: "DELETE"
      })
      .then(()=>{
          enqueueSnackbar("Logged out successfully!", {variant: "success"});
          navigate('/')})
      .catch(e=>console.log(e))

  
  }

  return (
    <div className='bg-color-tertiary rounded-lg h-16 '>
        <div className='rounded-lg flex flex-row mt-4  w-11/12 m-auto p-3'>
            <div className='flex flex-row p-1 text-2xl text-color-white '>
                <FaHandBackFist className='text-color-white text-4xl'/>
                <h1 className='font-semibold'> I-Reporter</h1>    
            </div>

            <div className='flex w-3/4 justify-around p-1 font-semibold text-color-white '>
                <Link className='inline-block border rounded-lg  hover:border-gray-200 hover:bg-color-blue2 hover:text-color-black py-1 px-3' to='/home'>Home</Link>
                <Link className='inline-block border rounded-lg  hover:border-gray-200 hover:bg-color-blue2 py-1 px-3' to='/home'>About</Link>
                <Link className='inline-block border rounded-lg  hover:border-gray-200 hover:bg-color-blue2   py-1 px-3' to='/login'>LogIn</Link>
                
            </div>
        </div>
        <Outlet></Outlet>
        <Footer/>
    
    </div>
  )
}

export default Navbar