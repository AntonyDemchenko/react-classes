import { pool } from "../db.js";

export async function insertData(title, id, completed) {
  try {
    const res = await pool.query(
      "INSERT INTO todo_list (title, todo_id, completed) VALUES ($1, $2, $3)",
      [title, id, completed]
    );
    console.log(
      `Added todo with title : ${title}, id : ${id}, completed status: ${completed}`
    );
  } catch (error) {
    console.error("!!!!!!!!!!!ERROR!!!!!!!!!!!!", error);
  }
}

export async function getData() {
  try {
    const res = await pool.query("SELECT * FROM todo_list ORDER BY id ASC");

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function modifyData(id, completed) {
  try {
    const res = await pool.query(
      "UPDATE todo_list SET completed = $2 WHERE todo_id = $1",
      [id, completed]
    );

    console.log(`Updated the completed of task to ${completed}`);
    // sortData();
  } catch (error) {
    console.error(error);
  }
}

export async function deleteData(id) {
  try {
    const res = await pool.query("DELETE FROM todo_list WHERE todo_id = $1", [
      id,
    ]);
    console.log(`Deleted todo with id ${id}`);
    // return res;
  } catch (error) {
    console.error(error);
  }
}

export async function toggleCompleted(completed) {
  try {
    const res = await pool.query("UPDATE todo_list SET completed = $1 ", [
      completed,
    ]);
    console.log(`Updated the completed of task to ${completed}`);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCompleted(completed) {
  try {
    const res = await pool.query("DELETE FROM todo_list WHERE completed = $1", [
      completed,
    ]);
    console.log(`Deleted todo with completed ${completed}`);
  } catch (error) {
    console.error(error);
  }
}

// export async function sortData() {
//   try {
//     const res = await pool.query("SELECT * FROM todo_list ORDER BY id ASC");
//     console.log(`sorted table`);
//     // console.log(res.rows);
//   } catch (error) {
//     console.error(error);
//   }
// }
