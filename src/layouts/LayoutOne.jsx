import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from  '../components/navbar/Navbar'
import SideNav from '../components/sidenav/SideNav'

const LayoutOne = () => {

  const sliceUser = useSelector((alu)=>alu.userData.value)
  const navigate  = useNavigate()
  

  useEffect(()=>{
    if(sliceUser==null){
      navigate('/login')
    }
  },)


  return (
    <>
    <Navbar/>
    <div className='flex'>
    <SideNav/>
    <Outlet/>
    </div>

    </>
  )
}

export default LayoutOne