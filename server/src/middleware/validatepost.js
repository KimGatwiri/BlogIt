function validatePost(req, res, next) {
  const { title, excerpt, body } = req.body;
  if (!title) return res.status(400).json({ message: "title is required" });
  // if (!featuredImage)
  //   return res.status(400).json({ message: "featured Image is required" });
  if (!excerpt) return res.status(400).json({ message: "excerpt is required" });
  if (!body) return res.status(400).json({ message: "body is required" });
  if (!title || !body || !excerpt) {
    return res.status(400).json({ message: "All fields are required." });
  }
  next();
}
export default validatePost;
