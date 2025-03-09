import jwt from "jsonwebtoken";

const TOKEN_SECRET = process.env.TOKEN_SECRET

export async function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "30m" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
      console.log(token);
    });
  });
}
