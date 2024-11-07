import React from "react";

function BlogCard({ post }) {
  return (
    <div className="max-w-md p-4 bg-blue-200 shadow-md rounded-lg hover:shadow-lg transition">
      <img
        src={post.featuredImage}
        alt={post.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 text-sm">{post.excerpt}</p>
        <div className="flex items-center mt-4">
          <img
            src={post.author.avatar || "/placeholder-avatar.png"}
            alt={post.author.username}
            className="w-8 h-8 rounded-full mr-2"
          />
          <div className="text-sm">
            <p>{post.author.username}</p>
            <p className="text-gray-700">{post.updatedDate}</p>
          </div>
        </div>
        <button
          className="mt-4 text-blue-500 hover:text-blue-700"
          onClick={() => (window.location.href = "/write")}
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
