import React from 'react';
import {Routes, Route} from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Rooms from './pages/Rooms.jsx';
import RoomDetail from './pages/RoomDetail.jsx';
import CreateRoom from './pages/CreateRoom.jsx';

const App = () => {
  
  
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/rooms' element={<Rooms/>}/>
        <Route path='/room/:id' element={<RoomDetail/>}/>
        <Route path='/room/create' element={<CreateRoom/>}/>





      </Route>

    
    </Routes>

    



    
  )
}

export default App