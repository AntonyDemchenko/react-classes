import jwt from "jsonwebtoken";

const keys = {
  jwtAccessSecret: "SECRET_KEY_ACCESSTOKEN",
  jwtRefreshSecret: "SECRET_KEY_REFRESHTOKEN",
};
class TokenService {
  generateToken(payload) {
    // console.log(";;;;;;;;;;;;;;;;;;;", keys);
    const accessToken = jwt.sign(payload, keys.jwtAccessSecret, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, keys.jwtRefreshSecret, {
      expiresIn: "15d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  authenticateToken(ctx) {
    const authHeader = ctx.headers["authorization"];

    const token = authHeader;
    if (token == null) {
      ctx.status = 401;
      console.log("token is null");
    }

    jwt.verify(token, keys.jwtAccessSecret, (err, user) => {
      if (err) return (ctx.status = 401);
      return true;
    });
  }
}

export const creatTokens = new TokenService();
