import jwt from "jsonwebtoken";

const keys = {
  jwtAccessSecret: "SECRET_KEY_ACCESSTOKEN",
  jwtRefreshSecret: "SECRET_KEY_REFRESHTOKEN",
};
class TokenService {
  generateToken(payload) {
    console.log(";;;;;;;;;;;;;;;;;;;", keys);
    const accessToken = jwt.sign(payload, keys.jwtAccessSecret, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, keys.jwtRefreshSecret, {
      expiresIn: "15d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export const creatTokens = new TokenService();
