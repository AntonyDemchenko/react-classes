import Router from "@koa/router";
import { v4 as uuidv4 } from "uuid";
import { verify } from "../jwtverify.js";

import {
  insertData,
  getData,
  modifyData,
  deleteData,
  toggleCompleted,
  deleteCompleted,
  register,
  login,
} from "../controllers/controller.js";

const router = new Router();
router.use(["/todos"], verify.jwtVerify);

router.get("get-all-todos", "/todos", async (ctx) => {
  await getData(ctx);
});

router.post("post-todo", "/todos", (ctx) => {
  // console.log("data", ctx.request.body);
  const title = ctx.request.body.title;
  const id = ctx.request.body.todo_id;
  const completed = ctx.request.body.completed;

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

router.post("registration", "/registration", (ctx) => {
  return register(ctx);
});

router.post("login", "/login", (ctx) => {
  return login(ctx);
});
// router.use(["/todos"], verify.jwtVerify);

export default router;
