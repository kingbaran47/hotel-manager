//import dbPool from '../config/dbPool.js'; -> prevents integration tests from working

export default (dbPool) => ({
    getAllRooms: async () => {
        const {rows} = await dbPool.query("SELECT * FROM rooms");
        return rows;
    },
    getRoomById: async (id) => {
    const { rows } = await dbPool.query("SELECT * FROM rooms WHERE id=$1", [id]);
    return rows[0];
  },

  createRoom: async ({ size, has_minibar }) => {
    const { rows } = await dbPool.query(
      "INSERT INTO rooms (size, has_minibar, is_available) VALUES ($1, $2, true) RETURNING id",
      [size, has_minibar]
    );
    return rows[0].id;
  },

  deleteRoom: async (id) => {
    const { rows } = await dbPool.query("SELECT * FROM rooms WHERE id=$1", [id]);
    if (rows.length === 0) return false;
    await dbPool.query("DELETE FROM rooms WHERE id=$1", [id]);
    return true;
  },

  editRoom: async (id, { size, has_minibar, is_available }) => {
    const { rows } = await dbPool.query("SELECT * FROM rooms WHERE id=$1", [id]);
    if (rows.length === 0) return false;

    await dbPool.query(
      "UPDATE rooms SET size=$1, has_minibar=$2, is_available=$3 WHERE id=$4",
      [size, has_minibar, is_available, id]
    );
    return true;
  }
})