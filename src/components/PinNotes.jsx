import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, update, remove } from "firebase/database"; 
import { useSelector } from 'react-redux';
import { PiDotsThreeVerticalBold } from "react-icons/pi";


export const PinNotes = () => {
  const sliceUser = useSelector((state)=>state.userData.value)

// ============= redux data ==========//



// ============= custom state ==========//
const [pinNote ,setPinNote] = useState([])
const [ShowMenu,setShowMenu]= useState(false)
const [clickId,setClickId]= useState("")



// ============= firebase variable ==========//
const db = getDatabase();


// ============= function ==========//
const handelShowMenu =(item)=>{
  setClickId(item)
  setShowMenu(!ShowMenu)

}

   // ========= update pin note =============//
    const handelUpdate =(updateNoteId)=>{
        update(ref(db ,'allNotes/'+updateNoteId),{
            pin:false
        })
        console.log(updateNoteId)

    }

    // ========= remove note =============//
        const handelRemove =(removeID)=>{
            remove(ref(db,'allNotes/' +removeID))
    
        }
    




// ============= realtime database ==========//
useEffect(()=>{
  onValue(ref(db,'allNotes/'), (snapshot) => {
    let arr =[]
    snapshot.forEach((item)=>{
      if(item.val().pin == true && item.val().creatorId == sliceUser.uid ){
        arr.push({...item.val(),key:item.key})
        
      }
    })
    setPinNote(arr)
  
  });
},[])
console.log(pinNote)

  return (
    <>
      <div className='flex flex-wrap gap-5'>
          {
              pinNote.map((item)=>(
                  <div key={item.key} style={{background:item.bgcolor}} className='w-[200px] h-[180px] border-2 border-[#C6E7FF] rounded-lg p-2'>               
                      <div className='relative'>
                          <PiDotsThreeVerticalBold onClick={()=>handelShowMenu(item)} className='text-xl  ml-auto z-auto'/>
                          {
                            clickId.key ==  item.key && ShowMenu &&
                          <div className='px-2 py-2 ml-auto absolute top-full right-0 w-fit flex flex-col bg-gray-300'>
                              <button onClick={()=>handelUpdate(item.key)}>Unpin</button>
                              <hr/>
                              <button>Edit</button>
                              <hr/>
                              <button onClick={()=>handelRemove(item.key)}>Remove</button>
                          </div>
                          }
                      </div>
                      <h2 className='text-[16px] font-poppins font-medium mb-2'>{item.noteTitle}</h2>
                      <p className='text-[12px] font-poppins font-light mb-2'>{item.noteDescription}</p>
      
                  </div>
              ))
          }
          </div>
    </>
  )
}
export default PinNotes