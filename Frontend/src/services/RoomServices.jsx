import axios from "axios"

// Fetch all rooms from the backend
export const getAllRooms = () => axios.get('http://localhost:5000/v1/rooms');

// Fetch a single room by its Id
export const getRoomById = (id) => axios.get(`http://localhost:5000/v1/rooms/${id}`)

// Edit an existing room by its Id
export const editRoom = (id, size, has_minibar, is_available) =>{
    return axios.put(`http://localhost:5000/v1/rooms/${id}`, {
        size,
        has_minibar,
        is_available
    });
};

// Delete a room by its Id
export const deleteRoom = (id) => axios.delete(`http://localhost:5000/v1/rooms/${id}`)

// Create a new room with size and minibar 
export const createRoom = (size, has_minibar) =>{
    return axios.post('http://localhost:5000/v1/rooms/create', {
        size,
        has_minibar
    });
};