import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import PersonalPost from "./personalPost";
import { API_BASE } from "../utils/apibase";

function PersonalPosts() {
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useQuery(["personalPosts"], async () => {
    const response = await fetch(`${API_BASE}/posts/user`, {
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  });

  if (isLoading) {
    return (
      <h2 className="text-center text-gray-600 text-xl my-6">Please Wait...</h2>
    );
  }

  if (isError) {
    return (
      <h2 className="text-center text-red-600 text-xl my-6">{error.message}</h2>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center my-6">
        <h3 className="text-lg text-gray-700">
          You don't have any blogs yet.{" "}
          <Link to="/writing" className="text-blue-500 hover:text-blue-600">
            Click to create one
          </Link>
        </h3>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Blogs</h2>
      <div className="grid gap-6">
        {posts.map((post, i) => (
          <PersonalPost
            key={post.id || i}
            id={post.id}
            title={post.title}
            excerpt={post.excerpt}
            body={post.body}
          />
        ))}
      </div>
    </div>
  );
}

export default PersonalPosts;
