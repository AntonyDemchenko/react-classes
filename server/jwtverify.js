import jwt from "jsonwebtoken";
import { checkRefreshToken } from "./controllers/controller.js";

const keys = {
  jwtAccessSecret: "SECRET_KEY_ACCESSTOKEN",
  jwtRefreshSecret: "SECRET_KEY_REFRESHTOKEN",
};

class Verify {
  async jwtVerify(ctx, next) {
    const authorization = ctx.headers["authorization"];

    const user = await jwt.decode(authorization);

    if (!authorization) {
      ctx.throw(401);
    }

    const token = authorization.trim();

    try {
      const claims = await jwt.verify(token, keys.jwtAccessSecret);

      if (!claims) {
        ctx.throw(401);
      }

      ctx.body = {
        user: claims.username,
      };
    } catch (err) {
      const tokens = await checkRefreshToken(user.username);

      ctx.body = { tokens: tokens, user: user.username };
    }

    return next(ctx);
  }
}

export const verify = new Verify();
