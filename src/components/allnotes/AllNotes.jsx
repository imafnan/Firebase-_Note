import React, { useState } from 'react'
import { FiPlusCircle } from "react-icons/fi";
import NotePopUP from '../NotePopUp/NotePopUP';


const AllNotes = () => {

  const [Popup, setPopUp] = useState(false)
  
  return (
    <>
    <div onClick={()=>setPopUp(!Popup)} className='w-[200px] h-[180px] border-2 border-[#C6E7FF] text-[16px] text-secondColor font-semibold font-poppins rounded-[5px] flex justify-center items-center gap-[7px]'>
        <FiPlusCircle />
        <h2>Add Note</h2>
    </div>
        <NotePopUP cardValue={Popup} popCross={()=>setPopUp(false)}/>
    </>
  )
}

export default AllNotes