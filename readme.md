# eXXellent Nights - Hotel Management System

A full-stack hotel room management application that allows the hotel staff to retrieve and modify room information. The System stores data in a database and exposes a REST API for interaction. A responsive frontend enables room listing, filtering, searching, creating, deleting and editing.

## Project Purpose

This application was developed as part of the assignment to create a hotel room management system that allows employees to:

- View and manage hotel room data
- Retrieve, create, update and delete room entries with REST API
- Use filter and search function

## Room Data Structure

Each room is structured as follows:
| Property | Description |
| ----- | --- |
| `id` | Room number as primary key |
| `size` | Enum of (Single, Double, Suite) |
| `has_minibar` | Boolean wheter room has minibar or not |
| `is_available` | Boolean wheter room is available or not |

### Documentation Requirements

## Tech Stack

### Frontend

| Technology     | Reason for Choice            |
| -------------- | ---------------------------- |
| `React (Vite)` | Fast development environment |
| `TailwindCSS`  | Reduced complexity           |

### Backend

| Technology          | Reason for Choice                 |
| ------------------- | --------------------------------- |
| `Node.js / Express` | Lightweight, REST API development |

### Database

| Technology   | Reason for Choice                                                           |
| ------------ | --------------------------------------------------------------------------- |
| `PostgreSQL` | Reliable ACID-compliant relational database suited for structured room data |

## Project Structure

### Backend

```
src
 ┣ config
 ┃ ┗ db.js                      (PostgeSQL connection + test data)
 ┣ controllers
 ┃ ┗ roomsController.js         (Room API)
 ┣ routes
 ┃ ┗ v1
 ┃ ┃ ┗ rooms.js                 (Room Routes)
 ┣ app.js                       (Express app setup)
 ┗ server.js                    (Start server)
```

### Frontend

```
src
 ┣ assets
 ┃ ┗ react.svg
 ┣ components                   (reusable UI components)
 ┃ ┣ DashboardCard.jsx          (Cards of selectable points)
 ┃ ┣ DateTime.jsx               (date and time)
 ┃ ┣ Header.jsx                 (header)
 ┃ ┗ RoomCard.jsx               (Cards of rooms)
 ┣ layouts                      (page layouts)
 ┃ ┗ MainLayout.jsx
 ┣ pages                        (app pages)
 ┃ ┣ CreateRoom.jsx
 ┃ ┣ Dashboard.jsx
 ┃ ┣ RoomDetail.jsx
 ┃ ┗ Rooms.jsx
 ┣ services                     (API calls / business logic)
 ┃ ┗ RoomServices.jsx
 ┣ App.css
 ┣ App.jsx
 ┣ index.css
 ┗ main.jsx
```

## Installation & Setup

### Backend

1. `cd .\Backend\ `
2. `npm install`
3. `.env file with DB credentials`
4. `npm run dev`

### Frontend

1. `cd .\Frontend\`
2. `npm install`
3. `npm run dev`

### Environment Variables

PORT=
DB_USER=
DB_HOST=
DB_DATABASE=
DB_PASSWORD=
DB_PORT=

## API Endpoints

| Method | Route             | Description       |
| ------ | ----------------- | ----------------- |
| GET    | /api/v1/rooms     | Get all rooms     |
| POST   | /api/v1/rooms     | Create a new room |
| GET    | /api/v1/rooms/:id | Get room by Id    |
| PUT    | /api/v1/rooms/:id | Update room by Id |
| DELETE | /api/v1/rooms/:id | Delete room by Id |
