import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      res.status(500).json({ message: "Access Denied" });
    }

    // if (token.startsWith("bearer ")) {
    //   token = token.slice(7, token.length).trimLeft();
    // }
    console.log(token);
    const verified = jwt.verify(token, process.env.JWT_SECRETE);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
