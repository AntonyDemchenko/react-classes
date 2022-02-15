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
  register,
} from "../controllers/controller.js";

const router = new Router();

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

router.post("login", "/login", (ctx) => {
  console.log("data", ctx.request.body);
  ctx.body = "send token";
  const testData = {
    username: "test",
    password: "123",
  };
  const clientData = ctx.request.body;
  console.log(clientData);
  if (
    testData.username === clientData.username &&
    testData.password === clientData.password
  ) {
    // console.log("Y");
    ctx.response.body = JSON.stringify({
      answer: "OK",
    });
  } else {
    // console.log("N");
    ctx.response.body = JSON.stringify({
      answer: "NO",
    });
  }
});

router.post("registration", "/registration", (ctx) => {
  return register(ctx);
});

export default router;
