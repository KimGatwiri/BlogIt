import React, { useEffect,useState } from "react";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useMutation, useQuery } from "react-query";
import { API_BASE } from "../utils/apibase";
import { useNavigate, useParams } from "react-router-dom";

function Editing() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: post = {},
    isLoading,
    isError,
    error,
  } = useQuery(["personalPosts", id], async () => {
    const response = await fetch(`${API_BASE}/postDetails/${id}`, {
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  });
    console .log(post);

    useEffect(()=>{
      if(post){

        setTitle(post.title || "");
        setExcerpt(post.excerpt ||"")
        setBody(post.body ||"")
      }
    },[post])

  const { mutate, isLoading: isUpdating } = useMutation(
    async (formData) => {
      const response = await fetch(`${API_BASE}/postDetails/${id}`, {
        method: "PUT",
        
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data =await response.json();
      console.log(data);
      return data;
    },
   {
      onSuccess: (data) => {
        navigate(`/postDetails/${data.id}`);

      
    }
  }
);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { title, excerpt, body };
    mutate(formData);
  };

  if (isLoading) {
    return <h2>Loading, please wait...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="my-7 text-center text-blue-800 text-4xl font-semibold">
        Update Blog
      </h1>
      <form onSubmit={handleSubmit}>
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
          <p>{title.length}/150</p>
        </div>
        <div className="mb-4">
          <label>Excerpt (required)</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Enter Excerpt here"
            maxLength="300"
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
            disabled={isUpdating}
          >
            {isUpdating ? "Please wait..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Editing;
