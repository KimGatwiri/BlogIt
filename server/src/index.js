import express from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

const client = new PrismaClient();
app.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 8);
    const newUser = await client.user.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        password: hashedpassword,
      },
    });
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
app.post("/auth/login", async (req, res) => {
  try {
    //Read the email addresss and  plain password from the user
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    //check whether the user exist by querying db agaist email
    const user = await client.user.findFirst({
      where: { emailAddress: emailAddress },
    });
    //if they dot exist that is an authentication failure
    if (!user) {
      res.status(401).json({ message: "wrong email address or password" });
      return;
    }

    //if they exist compare the plain password agaist hashed password
    const passwordmatch = await bcrypt.compare(password, user.password);
    //if they dont authentication failure
    if (!passwordmatch) {
      res.status(401).json({ message: "Wrong email Address or password" });
      return;
    }
    //if they match generate a token and save id there
    const Token = jwt.sign(user.id, process.env.JWT_SECRET);

    //the send token to user as a cookie

    res.status(200).cookie("authToken", Token, { httpOnly: true }).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
app.listen(2000, () => {
  console.log(`server is running on port 2000...`);
});
