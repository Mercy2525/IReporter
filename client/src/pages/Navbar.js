import { Link, Outlet, useNavigate} from 'react-router-dom'
import Footer from './Footer'
import { FaHandBackFist } from "react-icons/fa6";
import { SiWelcometothejungle } from "react-icons/si";
import { useSnackbar } from 'notistack';


function Navbar({user,setUser, admin, setAdmin}) {
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

  // function adminLogOut(){
  //   fetch("https://ireporter-backend.onrender.com/logoutA",{
  //     method: 'DELETE'
  //   })
  //   .then(setAdmin(null))
  //   .then(enqueueSnackbar('Admin logged out successfully', {variant:'success'}))
  //   .then(navigate('/'))
  // }

  
  return (
    <div className='bg-color-tertiary rounded-lg h-16 '>
        <div className='rounded-sm flex flex-row mt-1 mb-1  w-11/12 m-auto p-3'>
             <p className=" text-color-white font-medium text-3xl flex items-center">
                <FaHandBackFist className="w-6 mr-2 text-2xl"/>
                IReporter
              </p>

            <div className='flex flex-row m-auto  w-3/4 justify-around items-end content-end p font-medium text-color-white '>
                <Link className='rounded-lg hover:bg-color-blue2 hover:text-color-black py-2 px-2' to='/home'>Home</Link>

                {user?(
                  <div className='flex'>
                    <p>Redflag</p>
                    <p>Intervention</p>
                  </div>
                ):(
                  <Link className='rounded-lg  hover:bg-color-blue2 py-2 px-2' to={user? ('/landing') :'/login'}>Report Issue</Link>

                )}
                


               


             

                {user?(
                  <div className='flex text-sem text-2xl p-1'>
                    <SiWelcometothejungle className='text-3xl'/>
                    <p className=''> elcome, {user.username}</p>
                  </div>
                ):
                <p></p>}


               


                {/* {(admin||user) ? (
                  <div>
                    <button className='rounded-lg bg-color-tertiary hover:bg-color-blue2 py-2 px-2' onClick={admin? adminLogOut: handleLogOut}>LogOut</button>
                  </div>
                ) :
                <Link className='rounded-lg hover:bg-color-blue2 py-2 px-2' to='/login'>LogIn</Link>} */}


                {/* {admin ? (
                  <div>
                    <button className='rounded-lg bg-color-tertiary hover:bg-color-blue2 py-2 px-2' onClick={adminLogOut}>LogOut</button>
                  </div>
                ) :
                <Link className='rounded-lg hover:bg-color-blue2 py-2 px-2' to='/login'>LogIn</Link>}
                
                
                
                
                 {user ? (
                    <div>
                      <button className='rounded-lg bg-color-tertiary border hover:bg-color-blue2 py-2 px-2' onClick={handleLogOut}>LogOut</button>
                    </div>
                  ) : (
                    <Link className='rounded-lg hover:bg-color-blue2 py-2 px-2' to='/login'>LogIn</Link>
                  )
                } */}


                {/* {(admin || user) ? (
                  <div className='flex text-sem text-2xl p-1'>
                    <SiWelcometothejungle className='text-3xl'/>
                    <p>elcome, {admin ? admin.username : <p></p>}{user ? user.username : <p></p>}</p>
                  </div>
                ) : (
                  <p></p>
                )} */}


            </div>
                <div className='text-color-white font-medium mt-1 text-1xl flex items-center'>
                {user? (
                <div>
                  <button className=' rounded-lg bg-color-tertiary hover:bg-color-blue2 py-2 px-2' onClick={handleLogOut}>LogOut</button>
                </div>):
                <Link className='rounded-lg hover:bg-color-blue2 py-2 px-2' to='/login'>LogIn</Link>}
                </div>

        </div>
        <Outlet></Outlet>
        <Footer/>
    
    </div>
  )
}

export default Navbar