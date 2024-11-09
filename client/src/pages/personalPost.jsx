import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { API_BASE } from "../utils/apibase";
import { useMutation, useQueryClient } from "react-query";
// import { toast } from "react-toastify";

function PersonalPost({ id, title, excerpt, body }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Mutation for deleting a post
  const { mutate: deletePost, isLoading: isDeleting } = useMutation(
    async () => {
      const response = await fetch(`${API_BASE}/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    {
      onSuccess: () => {
        
        queryClient.invalidateQueries("personalPosts");
      },
      onError: (error) => {
        toast.error(`Error deleting post: ${error.message}`);
      },
    }
  );

  function handleEditingNavigation() {
    if (!id) return;
    navigate(`/edit/${id}`);
  }

  function handleDelete() {
    deletePost();
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 max-w-lg mx-auto transition-transform transform hover:scale-105 hover:shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-lg text-gray-600 mb-1 font-medium">{excerpt}</p>
      <div
        className="prose lg:prose-xl text-gray-800 mb-8"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <div className="flex space-x-4">
        <button
          onClick={handleEditingNavigation}
          className="flex items-center px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
        >
          <FaEdit className="mr-2" />
          <span>Update</span>
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
        >
          <FaTrashAlt className="mr-2" />
          <span>{isDeleting ? "Deleting..." : "Delete"}</span>
        </button>
      </div>
    </div>
  );
}

export default PersonalPost;
