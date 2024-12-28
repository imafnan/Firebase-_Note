import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const sliceUser = useSelector((alu) => alu.userData.value)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handelLogout = () => {
    navigate("/login")
    localStorage.removeItem("userData")
    dispatch(userDataReducer(null))
  }

  return (
    <div className='dark:bg-black h-[64px] flex items-center shadow-md'>
      <div className='container mx-auto'>
        <div className="navbar flex justify-between items-center px-4">
          {/* Logo Section */}
          <div className="nav_logo">
            <Link>
              <img src="/public/Notes.png" alt="Logo" className='dark:hidden w-32' />
              <img src="/public/Notes (1).png" alt="Logo Dark" className='hidden dark:block w-32' />
            </Link>
          </div>
          {/* User Info Section */}
          <div className='user_info flex items-center gap-8'>
            <div className='flex justify-center items-center gap-2'>
            <div className="user_profile w-[45px] h-[45px] rounded-full border-2 border-[#56f9ff] overflow-hidden shadow-md">
              <img src={sliceUser?.photoURL} alt="userPhoto" className='w-full h-full object-cover' />
            </div>
            <h2 className='dark:text-gray-300 text-[20px] font-bold text-gray-800 font-sans hover:text-[#DD2C00] transition duration-300'>
              {sliceUser?.displayName}
            </h2>
            </div>

            {/*=========== Logout ==============*/}
            <div className='text-xl cursor-pointer   border-red-500 text-red-500 hover:text-[#DD2C00] flex justify-center items-center gap-2 border-2 p-1.5 rounded-[10px] transition duration-300'>
              logout
              <FiLogOut 
              onClick={handelLogout} className='' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
