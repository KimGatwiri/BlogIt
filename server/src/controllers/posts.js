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
export async function fetchSinglePost(req,res){
  try{
    const{id}=req.params;
    const post = await prisma.post.findFirst({
      where:{id},
      include:{
        user:true
      }
    })
    if(!post){
      return res.status(404).json({message:"note not found"})
    }
   res.status(200).json (post)
  }catch(e){
    res.status(500).json({message:"something went wrong..."})

  }
}