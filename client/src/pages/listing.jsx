// import React, { useEffect, useState } from "react";
// import{useQuery} from'react-query';
// import BlogCard from "./Blogcard.jsx";
// import { API_BASE } from "../utils/apibase.js";

// function BlogListPage() {
//   const{isLoading,isError,error,data}=useQuery({
//     queryFn:async()=>{
//      const response= await fetch (`${API_BASE}/posts`);
//      if(response.ok===false){
//       const error=await response.json();
//       throw new Error(error.message);
//      }
//      const data =await response.json();
//      return data;

//     }
//   })
//   if(isLoading){
//     return(
//       <h2>please wait...</h2>
//     )
//   }
//   if(isError){
//     return(
//       <h2>{error.message}</h2>
//     )
//   }

//   const [posts, setPosts] = useState([]);

//   // Fetch posts if they come from an API
//   // useEffect(() => {
//   //   async function fetchPosts() {
//   //     // Replace with your actual data fetching logic
//   //     const response = await fetch(`${API_BASE}/posts`);
//   //     const data = await response.json();
//   //     setPosts(data);
//   //   }
//   //   fetchPosts();
//   // }, []);

//   return (
//     <div className="bg-blue-100 min-h-screen p-8">
//       <h1 className="text-3xl font-bold text-center mb-8">BlogIt Feed</h1>
//       <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {posts.map((post, i) => (
//           <BlogCard
//             key={i}
//             id={post.id}
//             title={post.title}
//             excerpt={post.excerpt}
//             body={post.body}
//             authorImgUrl={post.authorImgUrl}
//             authorName={`${post.user.firstName}${post.user.lasttName}`}
//             updatedDate={post.updatedDate}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default BlogListPage;
import React from "react";
import { useQuery } from "react-query";
import BlogCard from "./Blogcard.jsx";
import { API_BASE } from "../utils/apibase.js";

function BlogListPage() {
  const {
    isLoading,
    isError,
    error,
    data: posts,
  } = useQuery("fetchPosts", async () => {
    const response = await fetch(`${API_BASE}/posts`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return await response.json();
  });

  if (isLoading) {
    return <h2>Please wait...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="bg-blue-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">BlogIt Feed</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            title={post.title}
            excerpt={post.excerpt}
            body={post.body}
            authorImgUrl={post.authorImgUrl}
            authorName={`${post.user?.firstName} ${post.user?.lastName}`}
            updatedDate={new Date(post.updatedAt).toDateString()}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogListPage;
