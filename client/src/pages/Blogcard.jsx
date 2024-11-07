import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function BlogCard({
  id,
  title,
  excerpt,
  body,
  authorName,
  authorImgUrl,
  updatedDate,
}) {
  const navigate = useNavigate();

  if (!id) {
    navigate(`/postDetails/${id}`);
  }
  return (
    <div className="max-w-md p-4 bg-blue-200 shadow-md rounded-lg hover:shadow-lg transition">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">{excerpt}</p>

        <div
          className="prose lg:prose-xl text-gray-800 mb-8"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <div className="flex items-center mt-4">
          {authorImgUrl ? (
            <img src={authorImgUrl} className="w-8 h-8 rounded-full mr-2" />
          ) : (
            <FaUser />
          )}
          <div className="text-sm">
            <p>{authorName}</p>
            <p className="text-gray-700">{updatedDate}</p>
          </div>
        </div>
        <button
          className="mt-4 text-blue-500 hover:text-blue-700"
          onClick={() => navigate(`/postDetails/${id}`)}
        >
          Read More
        </button>
      </div>
    </div>
  );
}
export default BlogCard;
