import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createPost(req, res) {
  try {
    const { title, excerpt, body } = req.body;
    const userId = req.userId.id;
    const newPost = await prisma.post.create({
      data: {
        title,
        excerpt,
        body,
        owner: userId,
      },
    });

    res.status(201).json(newPost);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something went wrong .." });
  }
}
