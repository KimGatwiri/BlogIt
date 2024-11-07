import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const client = new PrismaClient();
export const registeruser = async (req, res) => {
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
};
