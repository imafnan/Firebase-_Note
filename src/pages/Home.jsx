import React from 'react'
import AllNotes from '../components/allnotes/AllNotes'
import SingleNote from '../components/singlenote/SingleNote'
import Pin from '../components/PinNotes'

const Home = () => {
  return (
    <>
      <div className='pl-[60px] pt-[54px] dark:bg-black w-full'>
        <AllNotes/>
        <h2 className='text-2xl text-secondColor font-semibold my-5'>....... pin Note ...................................</h2>
        <Pin/>
        <h2 className='text-2xl text-secondColor font-semibold my-5'>....... All Note ....................................</h2>
        <SingleNote/>
      </div>
    </>
  )
}

export default Home