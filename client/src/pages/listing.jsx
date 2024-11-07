import React, { useEffect, useState } from "react";
import BlogCard from "./Blogcard.jsx";
import Camera from "../assets/images/camera.jpg";
import photography from "../assets/images/photography.jpg";
function BlogListPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        title: "Making moments memorable",
        featuredImage: photography,
        excerpt:
          "Marry a photographer they say and memories will never fade ..",
        author: {
          username: "johndoe",
          avatar: Camera,
        },
        updatedDate: "Oct 24, 2024",
      },

      {
        id: 2,
        title: "Exploring React's New Features",
        featuredImage: "/images/react.jpg",
        excerpt:
          "React has introduced several new features in the latest version...",
        author: {
          username: "johndoe",
          avatar: "/images/johndoe.jpg",
        },
        updatedDate: "Oct 24, 2024",
      },
    ];
    setPosts(mockData);
  }, []);

  return (
    <div className="bg-blue-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8 ">BlogIt Feed</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default BlogListPage;
