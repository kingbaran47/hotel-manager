import React from 'react'

const RoomCard = ({data, handleClick}) => {

    
    // Destructure room properties from data prop
    const {number, size, has_minibar, is_available } = data;

    // Clicking the card will call handleClick
  return (
    
    <div onClick={() => handleClick(number)}className='bg-gray-300 flex flex-col h-35 w-40  justify-center items-center cursor-pointer '>
    <p className='text-3xl pb-2'>Room {number}</p>
    {/** Line */}
    <hr className='border-t-2 border-black w-full'/>
    {/** Room properties */}
    <p>{size}</p>
    <p>  {has_minibar ? "Minibar" : "No Minibar"}  </p>
    <p>{is_available ? "Available" : "Unavailable"}  </p>
    </div>
    
  )
  
}

export default RoomCard