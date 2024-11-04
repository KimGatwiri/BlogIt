import express from "express";
import cors from "cors";

import { registeruser } from "./controllers/users.js";
import { loginuser } from "./controllers/auth.js";
import validateUserDetails from "./controllers/validateuserdetails.js";


const app = express();
//register middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials:true,
  }),
);
//routes
app.post("/users",validateUserDetails, registeruser);
app.post("/auth/login",loginuser);
//server
app.listen(2000, () => {
  console.log(`server is running on port 2000...`);
});
