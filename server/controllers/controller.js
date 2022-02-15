import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { creatTokens } from "./services.js";

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

export async function register(ctx) {
  const body = ctx.request.body;

  try {
    if (!body.username || !body.password) {
      ctx.status = 400;
      ctx.body = {
        error: `expected an object with username, password but got: ${body}`,
      };
      return;
    }

    let user = await pool.query(
      "SELECT EXISTS(SELECT * FROM users WHERE username = $1)",
      [body.username]
    );

    if (!user.rows[0].exists) {
      body.password = await bcrypt.hash(body.password, 5);

      const tokenObj = creatTokens.generateToken({ username: body.username });

      const res = await pool.query(
        "INSERT INTO users (username, password, refreshtoken) VALUES ($1, $2, $3)",
        [body.username, body.password, tokenObj.refreshToken]
      );

      // ctx.status = 200;
      ctx.body = {
        status: 200,
        Message: "registration succeeded",
        accesstoken: tokenObj.accessToken,
        refreshToken: tokenObj.refreshToken,
      };
      return;
    } else {
      // ctx.status = 406;
      ctx.body = {
        status: 406,
        Message: "user name already exists",
      };
      return;
    }
  } catch (error) {
    // ctx.throw(500);
    console.log(error);
  }
}
