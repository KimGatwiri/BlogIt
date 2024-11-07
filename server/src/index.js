import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { registeruser } from "./controllers/users.js";
import { loginuser } from "./controllers/auth.js";
import validateUserDetails from "./middleware/validateuserdetails.js";
import { createPost } from "./controllers/posts.js";
import verifyToken from "./middleware/verifyToken.js";
import validatePost from "./middleware/validatepost.js";
const app = express();
//register middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());
//routes
app.post("/users", validateUserDetails, registeruser);
app.post("/auth/login", loginuser);
app.post("/writing", verifyToken, validatePost, createPost);
//server
app.listen(2000, () => {
  console.log(`server is running on port 2000...`);
});
