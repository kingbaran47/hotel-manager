import express from "express";
import pool from "../config/db.js";


// Fetch all rooms from the database
export const getAllRooms = async (req, res, db=pool) => {
    try {
        const {rows: rooms} = await db.query("SELECT * FROM rooms");
        res.status(200).json({
            rooms
        })
    } catch(error) {
        res.status(500).json({error: "Error while fetching rooms: " + error.message})
    }

}

// Fetch a room by Id
export const getRoomById = async (req, res, db=pool) => {
    const id = req.params.id;
    console.log(id)
    const {rows} = await db.query("SELECT * FROM rooms WHERE id=$1", [id])
    if(rows.length === 0) return res.status(404).json({error: "Room does not exist."});
    console.log(rows)
    res.json(
        rows[0]
    );
}
// Create a new room with information from request
export const createRoom = async (req, res, db=pool) => {
    //attribute aus req auslesen
    
    const {size, has_minibar} = req.body 
    console.log(size, has_minibar)
    try {
        const {rows} = await db.query("INSERT INTO rooms (size, has_minibar, is_available) VALUES ($1, $2, true) RETURNING id", [size, has_minibar])
        const newId = rows[0].id;
        res.status(201).json({message: "Room has been created.", id: newId})
    } catch (error) {
        res.status(500).json({error:"Error while creating new Room: " + error.message});
    }
    
}
// Delete a room by Id
export const deleteRoom = async (req, res, db=pool) => {
    const id = req.params.id
    console.log(id)
    try {
        const {rows} = await db.query("SELECT * FROM rooms WHERE id=$1", [id])
        if(rows.length === 0) return res.status(404).json({error:"Room does not exist."})
        const result = await db.query("DELETE FROM rooms WHERE id=$1", [id])
        return res.status(200).json({message: "Room has been deleted."})    
    } catch (error) {
        return res.status(500).json({error:"Error while deleting room: " + error.message})
    }
    
   
}
// Edit a room by Id
export const editRoom = async (req, res, db=pool) => {
    const id = req.params.id 
    const {size, has_minibar, is_available} = req.body
    try {
        const {rows} = await db.query("SELECT * FROM rooms WHERE id=$1", [id])
        if (rows === 0) return res.status(404).json(error, "Room does not exist.");
        const result = await db.query("UPDATE rooms SET size=$1, has_minibar=$2, is_available=$3 WHERE id=$4", [size, has_minibar, is_available, id])
        return res.status(200).json({message:"Room has been edited."})
    } catch (error) {
        return res.status(500).json({error:"Error while editing room: " + error.message})
    }
    
}




