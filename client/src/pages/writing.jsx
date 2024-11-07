import React, { useState } from "react";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useMutation } from "react-query";
import { API_BASE } from "../utils/apibase";

function Writing() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  // const [featuredImage, setFeaturedImage] = useState(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(`${API_BASE}/writing`, {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: "include",
      });
      console.log(response);
    },
    onSuccess: () => {
      console.log("Post created successfully!");
    },
    onError: () => {
      console.log("Error creating post.");
    },
  });

  // const handleImageUpload = (e) => {
  //   setFeaturedImage(e.target.files[0]);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("body", body);
    // formData.append("featuredImage", featuredImage);

    mutate(formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="my-7 text-center text-blue-800 text-4xl font-semibold ">
        Create New Blog
      </h1>
      <form onSubmit={handleSubmit}>
        {/* <div className="mb-4">
          <label>Featured Image (required)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div> */}
        <div className="mb-4">
          <label>Title (required)</label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title here"
            maxLength="150"
            required
            className="w-full p-2 border rounded"
          />
          <p>{title.length}/100</p>
        </div>
        <div className="mb-4">
          <label>Excerpt (required)</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Enter Excerpt here"
            maxLength="150"
            required
            className="w-full p-2 border rounded"
          />
          <p>{excerpt.length}/300</p>
        </div>
        <div className="mb-4">
          <label>Body (required)</label>
          <Editor
            style={{ height: "320px" }}
            value={body}
            onTextChange={(e) => setBody(e.htmlValue)}
          />
          <p>{body.length}/1000</p>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-800 text-white px-4 py-2 rounded text-2xl font-semibold disabled:bg-blue-500"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Writing;
