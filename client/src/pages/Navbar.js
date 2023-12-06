import { Link, Outlet, useNavigate} from 'react-router-dom'
import Footer from './Footer'
import { FaHandBackFist } from "react-icons/fa6";
import { SiWelcometothejungle } from "react-icons/si";
import { useSnackbar } from 'notistack';
import Button from '../Components/Button'


function Navbar({user,setUser}) {
  const {enqueueSnackbar} = useSnackbar();
  const navigate=useNavigate()

  function handleLogOut(){
    fetch("/logout",{
      method: 'DELETE'
    })
    .then(setUser(null))
    .then(enqueueSnackbar('Logged out successfully', {variant:'success'}))
    .then(navigate('/'))
  }

  
  return (
    <div className='bg-color-tertiary rounded-lg h-16 '>
        <div className='rounded-sm flex flex-row justify-between items-center h-full w-11/12 px-4'>
          <p className="text-color-white font-medium text-3xl flex items-center">
            <FaHandBackFist className="w-6 mr-2 text-2xl"/>
            IReporter
          </p>

    <div className='flex flex-row items-center justify-evenly h-full w-11/12 mt-5 space-x-4'>
      <Link className='text-color-white font-medium hover:bg-color-blue2 p-2 rounded-lg' to='/home'>Home</Link>

      {user ? (
        <div className='flex items-center w-4/6 justify-between flex-end my-4  space-x-4'>
          <Link className='text-color-white font-medium hover:bg-color-blue2 p-2 rounded-lg' to='/user/redflags'>Redflag</Link>
          <Link className='text-color-white font-medium hover:bg-color-blue2 p-2 rounded-lg' to='/user/intervention'>Intervention</Link>
          <div className='text-sem text-2xl flex my-4'>
            <SiWelcometothejungle className='text-3xl text-color-white '/>
            <p className='text-color-white'>elcome, {user.username}</p>
          </div>
          <Button content='LogOut' onClick={handleLogOut} className='text-sm hover:bg-color-blue2 rounded-lg border text-color-white py-2 px-4' />
        </div>
      ) : (
        <div className='w-1/3 m-auto flex justify-between'>
          <Link className='text-color-white font-medium hover:bg-color-blue2 p-2 rounded-lg' to='/landing'>Report Issue</Link>
          <Link className='text-color-white font-medium hover:bg-color-blue2 p-2 rounded-lg' to='/login'>LogIn</Link>
          
        </div>
      )}
    </div>
  </div>
        <Outlet></Outlet>
        <Footer/>
    </div>
  )
}

export default Navbar