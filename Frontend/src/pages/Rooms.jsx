import React from 'react'
import RoomCard from '../components/RoomCard.jsx'
import { useState, useEffect } from 'react'
import { getAllRooms } from '../services/RoomServices'
import { useNavigate } from 'react-router-dom'
import { PlusCircleOutlined } from '@ant-design/icons'


const Rooms = () => {

    // State for search input
    const [text, setText] = useState("")

    // State for filtes: availability, minibar, and size
    const [filter, setFilter] = useState({
        availability: "all",
        minibar: "all",
        size: "all"

    })
    const navigate = useNavigate();

    // State for storing rooms and counters
    const [rooms, setRooms] = useState([]);
    const [roomsCounter, setRoomsCounter] = useState(0)
    const [availableCounter, setAvailableCounter] = useState(0)
    const [unavailableCounter, setunAvailableCounter] = useState(0)


    const handleChange = (event) => {
        setText(event.target.value)

    }


    // Navigate to Create page
    const handleAdd = () => {
        navigate("/room/create")
    }

    // Fetch rooms from backend
    useEffect(() => {

        const fetchAllRooms = async () => {
            try {
                const response = await getAllRooms();
                setRooms(response.data.rooms)
                setRoomsCounter(response.data.rooms.length)
                setAvailableCounter(response.data.rooms.filter(room => room.is_available).length)
                setunAvailableCounter(response.data.rooms.filter(room => !room.is_available).length)
                console.log(rooms)
                console.log(response.data.rooms)
            } catch (error) {
                console.log("Error fetching rooms.")
            }
        }

        fetchAllRooms();


    }, [])

    // Filter rooms based on selected filters and search bar
    const filteredRooms = rooms.filter(room => {

        if (filter.availability === "available" && !room.is_available) return false;
        if (filter.availability === "unavailable" && room.is_available) return false;

        if (filter.minibar === "true" && !room.has_minibar) return false;
        if (filter.minibar === "false" && room.has_minibar) return false;

        if (filter.size === "Single" && room.size !== "single") return false;
        if (filter.size === "Double" && room.size !== "double") return false;
        if (filter.size === "Suite" && room.size !== "suite") return false;


        if (text && !room.id.toString().includes(text)) return false;

        return true;

    })

    // Sort rooms
    const sortedRooms = [...filteredRooms].sort((a, b) => a.id - b.id)

    const handleClick = (room) => {
        navigate(`/room/${room}`)


    }

    return (
        <div>

            {/* Header  */}
            <div className='flex flew-row justify-between p-4'>
                <div className='flex flex-col'>
                    <p className='font-bold'>Total: {roomsCounter} </p>
                    <p className='text-green-400'>Available: {availableCounter}</p>
                    <p className='text-red-400'>Unavailable: {unavailableCounter}</p>
                </div>
                <div >

                    {/* Filters: availability*/}
                    <div className='flex gap-4'>
                        <label>
                            <input type="radio"
                                name='availability'
                                value="all"
                                checked={filter.availability === "all"}
                                onChange={(e) => setFilter(prev => ({ ...prev, availability: e.target.value }))} />
                            All
                        </label>
                        <label>
                            <input type="radio"
                                name='availability'
                                value="available"
                                checked={filter.availability === "available"}
                                onChange={(e) => setFilter(prev => ({ ...prev, availability: e.target.value }))} />
                            Available
                        </label>
                        <label>
                            <input type="radio"
                                name='availability'
                                value="unavailable"
                                checked={filter.availability === "unavailable"}
                                onChange={(e) => setFilter(prev => ({ ...prev, availability: e.target.value }))} />
                            Unavailable
                        </label>
                    </div>


                    {/* Filters: minibar */}
                    <div className='flex gap-4'>
                        <label>
                            <input
                                type="radio"
                                name="minibar"
                                value="all"
                                checked={filter.minibar === "all"}
                                onChange={(e) => setFilter(prev => ({ ...prev, minibar: e.target.value }))}>
                            </input>
                            All
                        </label>
                        <label>
                            <input
                                type='radio'
                                name="minibar"
                                value="true"
                                checked={filter.minibar === "true"}
                                onChange={(e) => setFilter(prev => ({ ...prev, minibar: e.target.value }))} />
                            Minibar
                        </label>
                        <label>
                            <input
                                type='radio'
                                name="minibar"
                                value="false"
                                checked={filter.minibar === "false"}
                                onChange={(e) => setFilter(prev => ({ ...prev, minibar: e.target.value }))} />
                            No Minibar
                        </label>
                    </div>



                    {/* Filters: size */}
                    <div className='flex gap-4'>
                        <label>
                            <input
                                type="radio"
                                name="size"
                                value="all"
                                checked={filter.size === "all"}
                                onChange={(e) => setFilter(prev => ({ ...prev, size: e.target.value }))}>
                            </input>
                            All
                        </label>
                        <label>
                            <input
                                type='radio'
                                name="size"
                                value="Single"
                                checked={filter.size === "Single"}
                                onChange={(e) => setFilter(prev => ({ ...prev, size: e.target.value }))} />
                            Single
                        </label>
                        <label>
                            <input
                                type='radio'
                                name="size"
                                value="Double"
                                checked={filter.size === "Double"}
                                onChange={(e) => setFilter(prev => ({ ...prev, size: e.target.value }))} />
                            Double
                        </label>
                        <label>
                            <input
                                type='radio'
                                name="size"
                                value="Suite"
                                checked={filter.size === "Suite"}
                                onChange={(e) => setFilter(prev => ({ ...prev, size: e.target.value }))} />
                            Suite
                        </label>
                    </div>

                </div>

                {/* Search input */}
                <div className='flex justify-center items-center'>
                    <form>
                        <input type='text'
                            value={text}
                            onChange={handleChange}
                            placeholder='Search for room'
                            className='border p-2 rounded-2xl'
                        >
                        </input>
                    </form>
                </div>

                {/* Add new room button */}
                <PlusCircleOutlined onClick={handleAdd} className='text-2xl' />


            </div>
            <hr className='border-t-2 border-black' />



            {/* Room cards */}
            <div className='flex flex-wrap gap-10 p-10 items-center'>
                {sortedRooms.map(room => (
                    <RoomCard
                        key={room}
                        data={{
                            number: room.id,
                            size: room.size,
                            has_minibar: room.has_minibar,
                            is_available: room.is_available
                        }}
                        handleClick={handleClick} />
                ))}




            </div>

        </div>
    )
}

export default Rooms