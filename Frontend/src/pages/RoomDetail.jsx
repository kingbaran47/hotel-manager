import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { getRoomById } from '../services/RoomServices.jsx';
import { Select, Button, message  } from 'antd'
import { editRoom } from '../services/RoomServices.jsx';
import { deleteRoom } from '../services/RoomServices.jsx';
import { useNavigate } from 'react-router-dom';



const RoomDetail = () => {

   const navigate = useNavigate();

    // onChange for Select components
    const onChangeAvailabiliy = value => {
        setAvailability(value)
    }
    const onChangeSize = value => {
        setSize(value)
    }
    const onChangeMinibar = value => {
        setMinibar(value)
    }

    // Get room id from URL
    const {id} = useParams();
    
    // State of rooms and properties
    const [room, setRoom] = useState({});
    const [availability, setAvailability] = useState();
    const [size, setSize] = useState();
    const [minibar, setMinibar] = useState();
    
    // Function to delete a room
    const handleDelete = async () => {
      try {
          const response = await deleteRoom(id);
          console.log("Room deleted.", response.data);
          message.success("Room has been deleted.")
          setTimeout(() => {
            navigate('/rooms')
          }, 500)
      } catch {
          console.log("Error during deleting.")
          message.error("Error during deleting.")
      }
    }

    // Function to submit edited room data
    const handleSubmit = async () => {
      try {
        const response = await editRoom(id, size, minibar, availability);
        console.log("OK.", response.data)
        message.success("Room updated successfully.")
        setRoom({
          ...room,
          is_available: availability,
          size: size,
          has_minibar: minibar
        })
     } catch (error) {
        console.log("Error during editing.")
        message.error("Failed to update room.")
      }
    }

    // Fetch the room on render
    useEffect(() => {
        const fetchThisRoom = async () => {
            console.log(id)
            const response = await getRoomById(id);
            const data = response.data;
            setRoom(data)
            console.log(data)
            setAvailability(data.is_available)
            setMinibar(data.has_minibar)
            setSize(data.size)
            
            
        }

        fetchThisRoom();
    }, [])


  return (
    <div>
         {/* Page title */}
        <p className='text-5xl p-4 text-center '> Room {id} </p>
        
      <div className='flex flex-row justify-center gap-30'>    
        <div>
        {/** Information about Room */}
            <p className='text-4xl pb-3'>Information</p>
            <p className=''> <p className='bg-gray-200 font-bold'>Availability</p>  {room.is_available ? "available" : "unavailable"}</p>
            <p> <p className='bg-gray-200 font-bold'>Size</p>  {room.size}</p>
            <p> <p className='bg-gray-200 font-bold'>Minibar</p>  {room.has_minibar ? "minibar" : "no Minibar"}</p>
        </div>
        

        {/** Edit room */}
        <div className='flex flex-col '>
            <p className='text-4xl pb-3 '>Edit</p>
            <div className='flex flex-row gap-8'>
            <p>Set Availability</p>
            <Select placeholder="Available?"
            value={availability}
            onChange={onChangeAvailabiliy}
            options={[
           {
            value: true,
            label: 'Yes',
          },
          {
            value: false,
            label: 'No',
          }]}>
        </Select>
        </div>

        {/** Edit size */}
        <div className='flex flex-row justify-between'>
          <p>Set Size</p>
          <Select placeholder="Size?"
          value={size}
          onChange={onChangeSize}
          className='w-25'
          options={[
        {
        value: 'single',
        label: 'Single',
      },
      {
        value: 'double',
        label: 'Double',
      },
      {
        value: 'suite',
        label: 'Suite',
      }]}>
      </Select>
      </div>

      {/** Edit minibar */}
      <div className='flex flex-row justify-between'> 
      <p>Select Minibar</p>
      <Select placeholder="Minibar?"
      value={minibar}
      onChange={onChangeMinibar}
      options={[  
      {
        value: true,
        label: 'Yes',
      },
      {
        value: false,
        label: 'No',
      }]}>
      </Select>
      </div>

      {/** Submit button */}
      <div className='mt-6 flex justify-center '>
        <Button 
        type='primary'
        size='large'
        onClick={handleSubmit}
        className='bg-gray-400!'>
          Submit
        </Button>
      </div>
    </div>
</div>


    {/** Room image */}
    <div className='flex flex-col  justify-center items-center p-10'>
      <p className='text-4xl pb-4'>Picture</p>
      <img src="/hotelroom.jpeg" className='w-140 h-auto' alt="Room"></img>
    </div>

    {/** Delete button */}
    <div className='flex justify-center pb-4'>
      <Button onClick={handleDelete} type='primary' danger><p>Delete Room</p></Button>
    </div>
</div>
  )
}

export default RoomDetail