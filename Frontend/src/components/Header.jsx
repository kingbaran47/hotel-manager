import React from 'react'
import DateTime from './DateTime.jsx'
import {HomeOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Function for clicking  Home icon -> navigates to dashboard
  const handleClick= () => {
    navigate("/dashboard")
  }

  return (
    <div className='w-full'>
      {/** Header */}
        <div className='flex flex-row justify-between p-4'>
        <DateTime></DateTime>
        <div className='flex items-center justify-center flex-col'>
        <p>smartel v1.0 </p>
        <HomeOutlined onClick={handleClick} className='text-2xl' />
        </div>
        <p>Hotel: eXXellent Nights</p>
        </div>
      <hr className='border-t-2 border-black '/>

    </div>
  )
}

export default Header