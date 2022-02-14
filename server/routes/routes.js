import Router from "@koa/router";
import { pool } from "../db.js";
import { v4 as uuidv4 } from "uuid";
import {
  insertData,
  getData,
  modifyData,
  deleteData,
  toggleCompleted,
  deleteCompleted,
} from "../controllers/controller.js";

const router = new Router();

// let todosList = [
//   {
//     title: "test title 1",
//     id: "324243243243243rewfew43rf43f4",
//     completed: false,
//   },
//   {
//     title: "test title 2!",
//     id: "dsfdsfvbfe4w43r434tg",
//     completed: false,
//   },
//   {
//     title: "test title 3!",
//     id: "dsffffffffffffffff43r434tg",
//     completed: true,
//   },
// ];

router.get("get-all-todos", "/todos", async (ctx) => {
  ctx.body = "get todos";

  let newTodos = await getData();

  return (ctx.body = newTodos.rows);
});

router.post("post-todo", "/todos", (ctx) => {
  console.log("data", ctx.request.body);
  const title = ctx.request.body.title;
  const id = uuidv4();
  const completed = false;

  insertData(title, id, completed);

  ctx.body = "todo added";
  ctx.response.body = JSON.stringify({
    title: title,
    todo_id: id,
    completed: completed,
  });
});

router.delete("delete-todo", "/todos/:id", (ctx) => {
  deleteData(ctx.params.id);

  ctx.body = "todo deleted";
  // return (ctx.response.body = "WOOOOOOW");
  ctx.response.body = JSON.stringify({
    todo_id: ctx.params.id,
  });
});

router.put("toggle-todo", "/todos/:id", (ctx) => {
  modifyData(ctx.params.id, ctx.request.body.completed);

  ctx.body = "toggle todo";
  ctx.response.body = JSON.stringify({
    todo_id: ctx.params.id,
  });
});

router.put("toggle-all-todo", "/todos/check-all/:all", (ctx) => {
  toggleCompleted(ctx.params.all);

  ctx.body = "all todos toggle";
});

router.delete("delete-all-checked", "/todos/delete-checked/:all", (ctx) => {
  deleteCompleted(true);

  ctx.body = "deleted all true";
});

export default router;
