import React, { useState } from 'react'
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from 'react-redux';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { VscSymbolColor } from 'react-icons/vsc';
import { CiCircleRemove } from 'react-icons/ci';
const NotePopUP = ({cardValue , popCross}) => {

const sliceUser = useSelector((state)=>state.userData.value)




  const [showColor, setShowColor] = useState(false)
  const [bgcolor, setBgcolor]     = useState("#FBFBFB")
  const [formdata, setFormdata]     = useState({noteTitle:"", noteDescription:"", noteTitleError:"", noteDescriptionError:""})



// --------------- firebase read &write data method  ----------------//

const db = getDatabase();


// -------------------------//
const handelButton =()=>{
      if(!formdata.noteTitle){
        setFormdata((prev)=>({...prev ,noteTitleError:"Enter your note"}))
        
      }
      if(!formdata.noteDescription){
        setFormdata((prev)=>({...prev ,noteDescriptionError:"Enter your your Description "}))
      }
      else{
        set(push(ref(db, 'allNotes/')), {
          noteTitle:formdata.noteTitle,
          noteDescription:formdata.noteDescription,
          bgcolor:bgcolor,
          creatorId:sliceUser.uid,
          pin:false
        });
        popCross()
        setFormdata((prev)=>({...prev,
          noteTitle:"", noteDescription:"", noteTitleError:"", noteDescriptionError:""
        }))
        setBgcolor("#FBFBFB")
      }
}

  // console.log(sliceUser.uid)

  return (
    <>
    <div className={`${cardValue? "w-full": "w-0 right-[-100px]"} transition-all duration-[1s] h-screen dark:bg-[#363636a8]  bg-[#00000049] absolute top-0 right-0 flex justify-center items-center `}>
        <div onClick={popCross} className={`${cardValue? "block" :"hidden"} absolute top-5 right-10 text-red-700 text-[70px]`}>
          <CiCircleRemove/>
        </div>

        <div style={{background:bgcolor}} className={`${cardValue? "block" :"hidden"} w-[731px] p-8 z-10 rounded-lg bg-[#FBFBFB] `}>
            
            {/* note title */}
            <h2 className='font-poppins text-[24px] text-black font-bold'>Note Title </h2>
            <p className='text-[14px] text-red-500'>{formdata.noteTitleError}</p>
            <input value={formdata.noteTitle} onChange={(e)=> setFormdata((prev)=>({...prev ,noteTitle : e.target.value, noteTitleError:""}))} className='w-full h-[45px] text-lg  font-poppins font-semibold border-2 border-[#D1D1D1] outline-none p-5 my-[20px] rounded-md' type="text" placeholder='Enter Your Note Title'  />
            
            {/* Description */}
            <h2 className='font-poppins text-[24px] text-black font-bold'>Description</h2>
            <p className='text-[14px] text-red-500'>{formdata.noteDescriptionError}</p>
            <textarea placeholder='Enter your Description' value={formdata.noteDescription} onChange={(e)=> setFormdata((prev)=>({...prev ,noteDescription : e.target.value, noteDescriptionError:""}))}  className='w-full h-[200px] text-lg  bg-gray-200 font-poppins font-semibold border-2 border-[#D1D1D1 outline-none p-5 my-[20px] rounded-md' type="text" />
        
         <div className='flex justify-between'>
          <div className='colors overflow-hidden w-[300px] flex items-center gap-4 relative'>
                <IoColorPaletteOutline  onClick={()=>setShowColor(!showColor) } className='text-3xl text-gray-700 hover:rotate-180 transition-all duration-500' />
                <div className={`all_colors w-[190px] flex gap-4 absolute transition-all duration-[.4s] ${showColor? "left-10" :"left-[-230px]"}`}>
                    <button onClick={()=>setBgcolor("#638C6D")} className='w-[25px] h-[25px] border-2 border-[#D1D1D1] rounded-full bg-[#638C6D]'></button>
                    <button onClick={()=>setBgcolor("#4DA1A9")} className='w-[25px] h-[25px] border-2 border-[#D1D1D1] rounded-full bg-[#4DA1A9]'></button>
                    <button onClick={()=>setBgcolor("#D39D55")} className='w-[25px] h-[25px] border-2 border-[#D1D1D1] rounded-full bg-[#D39D55]'></button>
                    <button onClick={()=>setBgcolor("#009990")} className='w-[25px] h-[25px] border-2 border-[#D1D1D1] rounded-full bg-[#009990]'></button>
                    <button  className='w-[25px] h-[25px] border-2 border-[#D1D1D1] rounded-full flex items-center justify-center'>
                    <label htmlFor="colors">
                      <VscSymbolColor/>
                    </label>
                    <input onChange={(e)=>setBgcolor(e.target.value)} id='colors' className='hidden bg-gray-200' type="color" /> 
                    </button>
                </div>
            </div>
            <button 
  onClick={handelButton} 
  className="
    px-6 
    py-3 
    rounded-md 
    text-white 
    font-semibold 
    relative 
    bg-gradient-to-r from-gray-800 to-gray-600 
    hover:from-red-400 hover:to-red-500 
    shadow-md 
    hover:shadow-lg 
    transition-all 
    duration-500 
    text-lg 
    [text-shadow:1px_2px_3px_#000000]hover:[text-shadow:2px_3px_5px_#fda4af]
  "
>
  ADD NOTE
</button>

         </div>
        </div>

    </div>
    </>

  )
}

export default NotePopUP