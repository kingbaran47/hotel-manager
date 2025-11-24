import React from 'react'

const DashboardCard = ({data, handleClick}) => { //props kommen rein
  
    // Destructure entry from props
    const {entry} = data
    

    return (
    <div>
        <div 
        onClick={() => handleClick(entry)} 
        className=' bg-gray-300 inline-flex items-center justify-center h-40 w-60 cursor-pointer'>
        
        {/** Display dashboard entry item */}
        <p>{entry}</p>
        </div>
    </div>
  )
}

export default DashboardCard