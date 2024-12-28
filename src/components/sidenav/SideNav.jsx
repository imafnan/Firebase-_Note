import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './SideNav.css'
import { LuLayoutList } from "react-icons/lu";
import { MdOutlineLightMode, MdOutlinePushPin } from "react-icons/md";
import { BsFillMoonFill } from "react-icons/bs";
import { RiDeleteBin3Line } from 'react-icons/ri';


const SideNav = () => {
  // ========== state
  const [toggleValue, setToggleValue] = useState(false);
  // ========== saving the mode when user  visitor
  useEffect(() => {
    const savedMode = localStorage.getItem("mode") || "light";
    localStorage.setItem("mode", savedMode);
    document
      .querySelector("html")
      .classList.toggle("dark", savedMode === "dark");
  }, []);
  // ========== changing the mode on toggle
  const handelMode = () => {
    if (localStorage.getItem("mode") == "light") {
      localStorage.setItem("mode", "dark");
      document.querySelector("html").classList.add("dark");
      setToggleValue(!toggleValue);
    } else {
      localStorage.setItem("mode", "light");
      document.querySelector("html").classList.remove("dark");
      setToggleValue(!toggleValue);
    }
  };
  return (
    <>
    <nav className='sideNav dark:bg-black  h-screen transition-all duration-[.4s]'>
        <h2 className='dark:text-white text-[20px] px-[21px]  font-medium font-poppins text-[#646262]'>All Note List</h2>
        <ul className='w-[157px]'>
            <li><NavLink to="/" className={({ isActive}) =>[isActive ? "activePage" : "DeActivePage",].join(" ")}><LuLayoutList/> All Notes</NavLink></li>
            <li><NavLink to="/pin_notes" className={({ isActive}) =>[isActive ? "activePage" : "DeActivePage",].join(" ")}><MdOutlinePushPin/> Pined </NavLink></li>
            <li><NavLink to="/bin_notes" className={({ isActive}) =>[isActive ? "activePage" : "DeActivePage",].join(" ")}><RiDeleteBin3Line/> Bin</NavLink></li>
        </ul>
        {localStorage.getItem("mode") == "light" ? (
          <button
            className="py-3 w-full  flex justify-center items-center gap-2 mt-[340px] bg-black text-xl text-white transition-all duration-[.4s]"
            onClick={handelMode}
          >
          <BsFillMoonFill className='text-[25px]'/>
          Dark
          </button>
        ) : (
          <button
            className="py-3 w-full  mt-[340px] flex justify-center items-center gap-2 bg-white text-black  text-xl transition-all duration-[.4s]"
            onClick={handelMode}
          >
          
          <MdOutlineLightMode className='text-[25px]'/>
          Light
          </button>
        )}
    </nav>
    </>
  )
}

export default SideNav