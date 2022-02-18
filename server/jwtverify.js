import jwt from "jsonwebtoken";
import { checkRefreshToken } from "./controllers/controller.js";

const keys = {
  jwtAccessSecret: "SECRET_KEY_ACCESSTOKEN",
  jwtRefreshSecret: "SECRET_KEY_REFRESHTOKEN",
};

class Verify {
  async jwtVerify(ctx, next) {
    // console.log("start verify--------------------------xxxx------------");

    const authorization = ctx.headers["authorization"];
    // console.log(authorization);

    const user = jwt.decode(authorization);
    console.log("----------------------------", user);

    if (!authorization) {
      ctx.throw(401);
    }

    const token = authorization.trim();

    try {
      const claims = await jwt.verify(token, keys.jwtAccessSecret);

      console.log(claims);

      if (!claims) {
        ctx.throw(401);
      }

      ctx.body = {
        user: claims.username,
      };
    } catch (err) {
      const tokens = await checkRefreshToken(user.username);
      console.log("tttttttttttttttttttt", tokens);
      ctx.body = { tokens: tokens };
      // return;
      // ctx.throw(401);
    }

    return next(ctx);
  }
}

export const verify = new Verify();
