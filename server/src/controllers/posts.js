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
export async function fetchSinglePost(req, res) {
  try {
    const { id } = req.params;
    const post = await prisma.post.findFirst({
      where: { id },
      include: {
        user: true,
      },
    });
    if (!post) {
      return res.status(404).json({ message: "note not found" });
    }
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ message: "something went wrong..." });
  }
}
export async function fetchAllposts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      where: {},
      include: {
        user: true,
      },
    });
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ message: "something went wrong..." });
  }
}
export async function fetchUserPosts(req, res) {
  const UserId = req.userId.id;
  const posts = await prisma.post.findMany({
    where: {
      owner: UserId,
    },
  });
  res.status(200).json(posts);
}
export async function deletePost(req, res) {
  try {
    const { id } = req.params; // Make sure this is `id` to match the route parameter
    const userId = req.userId.id; // userId set by verifyToken middleware

    const post = await prisma.post.findFirst({
      where: {
        id: id, // Use `id` here to refer to the post ID
        owner: userId, // Check if post's owner matches the userId
      },
    });

    if (!post) {
      return res
        .status(404)
        .json({
          message: "Post not found or you're not authorized to delete it.",
        });
    }

    await prisma.post.delete({
      where: {
        id: id, // Use `id` here to delete by the ID
      },
    });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (e) {
    console.error("Error deleting post:", e); // Log the error
    res.status(500).json({ message: e.message });
  }
}
// export async function update(req,res){
//   try{
//     const{id}= req.params;
//   const{title,excerpt,body}=req.body;
//   const UserId=req.userId.id;
//   const post=await prisma.post.update({
//     where:{
//       id:id,owner:UserId,

//     },
//     data:{title,excerpt,body}
//   })
//   res.status(200).json(post);
//   }catch(e){
//   res.status(500).json({message:error})
//   }
// }

export async function update(req, res) {
  try {
    const { id } = req.params;
    const { title, excerpt, body } = req.body;
    const UserId = req.userId.id; // Adjust if needed to match middleware

    const post = await prisma.post.update({
      where: {
        id: id,
        owner: UserId, // Make sure 'owner' field exists in schema or modify accordingly
      },
      data: { title, excerpt, body },
    });

    res.status(200).json(post);
  } catch (error) {
    console.error(error); // Log full error for debugging
    res.status(500).json({ message: error.message });
  }
}
