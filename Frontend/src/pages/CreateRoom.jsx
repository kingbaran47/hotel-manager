import React from 'react';
import {Select, Button, message} from 'antd';
import { useState } from 'react'
import { createRoom } from '../services/RoomServices.jsx';

import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
    
    const navigate = useNavigate();

    // State for room properties
    const [size, setSize] = useState();
    const [minibar, setMinibar] = useState();

        
    // Functions for select components
    const onChangeSize = value => {
        setSize(value)
    }

    const onChangeMinibar = value => {
        setMinibar(value)
    }
    
    // Function create room and navigate to new room detail page
    const handleCreate = async () => {
        try {
            const response = await createRoom(size, minibar);
            console.log("Room created")
            console.log(response.data)
            message.success("Room has been created.")
            const newId = response.data.id
            setTimeout(() => {
            navigate(`/room/${newId}`)
            }, 500)
        } catch (error) {
            console.log("Error during creating room.")
            message.error("Error during creating room.")   
        }
    }

  return (
    <div className='min-h-screen  bg-gray-100 flex flex-col items-center'>
    
    {/** Page title */}
    <h1 className='text-5xl font-bold mb-8 text-center'>Create Room</h1>

    {/** Form container */}
    <div className='bg-white w-full max-w-2xl flex p-8 gap-6 flex-col rounded-2xl '>

    {/** Size selector */}
    <div className='flex flex-col gap-2'>
    <p>Set Size</p>
    <Select placeholder="Size?"
    
    onChange={onChangeSize}
   
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
      }
     
    ]}>
    </Select>
   </div>

        {/** Minibar selector */}
        <div className='flex flex-col gap-2'>
        <p>Select Minibar</p>
        <Select placeholder="Minibar?"
        onChange={onChangeMinibar}
        options={[
        {
           value: true,
           label: 'Yes',
        },
        {
           value: false,
           label: 'No',
        }
        
       ]}
   >
   </Select>
    </div>

       <div className='flex justify-center pt-7'>
       <Button><p>Upload Pictures</p></Button> 
       </div>
       
       {/** Upload pictures button */}
       <Button 
               type='primary'
               size='large'
               onClick={handleCreate}
               className='bg-gray-400!'>
                 Create
               </Button>
       </div>
    </div>
  )
}

export default CreateRoom