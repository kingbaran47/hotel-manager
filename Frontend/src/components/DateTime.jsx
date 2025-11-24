import React from 'react'
import { useState, useEffect } from 'react'

const DateTime = () => {

    // State to store current time and date
    var [date, setDate] = useState(new Date());

    // update date object every second
    useEffect(() => {

      // Set new date
        var timer = setInterval(()=>setDate(new Date()), 1000)
        
        // Clean when unmount
        return function cleanup() {  
            clearInterval(timer)
        }
    })

  return (
    <div>
      <p>Time : {date.toLocaleTimeString()} Date : {date.toLocaleDateString()} </p>
    </div>
  )
}

export default DateTime