import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { registeruser } from "./controllers/users.js";
import { loginuser } from "./controllers/auth.js";
import validateUserDetails from "./middleware/validateuserdetails.js";
import { createPost, fetchSinglePost } from "./controllers/posts.js";
import verifyToken from "./middleware/verifyToken.js";
import validatePost from "./middleware/validatepost.js";
import { fetchAllposts } from "./controllers/posts.js";
import { fetchUserPosts } from "./controllers/posts.js";
import { deletePost } from "./controllers/posts.js";
import { update } from "./controllers/posts.js";

const app = express();
//register middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE","PUT"],
    credentials: true,
  }),
);
app.use(cookieParser());
//routes
app.post("/users", validateUserDetails, registeruser);
app.post("/auth/login", loginuser);
app.post("/writing", verifyToken, validatePost, createPost);
app.get("/postDetails/:id", fetchSinglePost);
app.get("/posts", fetchAllposts);
app.get("/posts/user", verifyToken, fetchUserPosts);
app.delete("/posts/:id",verifyToken,deletePost);
app.put("/postDetails/:id",verifyToken,validatePost,update)
//server
app.listen(2000, () => {
  console.log(`server is running on port 2000...`);
});
