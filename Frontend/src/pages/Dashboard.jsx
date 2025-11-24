import React from 'react'
import DashboardCard from '../components/DashboardCard.jsx';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  //Dashboard entries
  const entries = [
    "Rooms",
    "Settings",
    "Help",
   
  ]

  // Function for Cardclick
  const handleClick = (entry) => {
    console.log(`${entry} clicked`)
    // Navigate to rooms
    if(entry === 'Rooms') {
      navigate('/rooms')
  }
    // Navigate to ...
}




  return (
    
    <div className=' flex  mt-8 justify-center'>
      {/** Container for  dashboardcards*/}
      <div className='flex flex-wrap gap-8'> 
       {entries.map(entry => (
        <DashboardCard 
        key={entry} 
        data={{entry}}
        handleClick={handleClick}
        />
       ))}
      </div>
    </div>
  )
}

export default Dashboard