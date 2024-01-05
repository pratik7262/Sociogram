import express from "express";
import { getUserIds, login, register } from "../controllers/auth.js";
// import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getids", getUserIds);

export default router;
