"use strict";

import router from "./routes/routes.js";

import Koa from "koa";

import bodyParser from "koa-bodyparser";

import cors from "@koa/cors";

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  ctx.body = "Hello World!";
});

app.listen(3000);

export default app;
