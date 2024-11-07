// import { QueryClient, QueryClientProvider } from "react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./index.css";
// import Signup from "./pages/signup";
// import Login from "./pages/login";
// import Home from "./pages/home";
// import Navigation from "./pages/navigation";
// import BlogListPage from "./pages/listing";
// import Writing from "./pages/writing";
// import Article from "./pages/Article";
// import PostDetails from "./pages/postdetails";
// const client = new QueryClient();
// function App() {
//   return (
//     <QueryClientProvider client={client}>
//       <BrowserRouter>
//         <Navigation />
//         <Routes>
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/Login" element={<Login />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/BlogListPage" element={<BlogListPage />} />
//           <Route path="/writing" element={<Writing />} />
//           <Route path="/Article" element={<Article />} />
//           <Route path="/postDetails/:id" element={<PostDetails />} />
//           <Route path="/" element={<Home />} />
//         </Routes>
//       </BrowserRouter>
//     </QueryClientProvider>
//   );
// }

// export default App;
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/Home/home"; // Import the Home component
import Navigation from "./pages/navigation";
import BlogListPage from "./pages/listing";
import Writing from "./pages/writing";
import Article from "./pages/Article";
import PostDetails from "./pages/postdetails";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

// This component handles the conditional rendering of the Navigation bar
function AppContent() {
  const location = useLocation(); // Get the current location

  const excludeNavRoutes = ["/", "/signup", "/login"]; // Routes to exclude the navigation bar

  return (
    <>
      {/* Only render Navigation if the route is not in the excluded list */}
      {!excludeNavRoutes.includes(location.pathname) && <Navigation />}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/BlogListPage" element={<BlogListPage />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/Article" element={<Article />} />
        <Route path="/postDetails/:id" element={<PostDetails />} />
        {/* Default Route */}
        <Route path="/" element={<Home />} />{" "}
        {/* This will display the Home page on the root path */}
      </Routes>
    </>
  );
}

export default App;
