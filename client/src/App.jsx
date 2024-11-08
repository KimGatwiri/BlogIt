import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/Home/home";
import Navigation from "./pages/navigation";
import BlogListPage from "./pages/listing";
import Writing from "./pages/writing";
import Personalposts from "./pages/personalPosts";
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

function AppContent() {
  const location = useLocation();

  const excludeNavRoutes = ["/", "/signup", "/login"];

  return (
    <>
      {!excludeNavRoutes.includes(location.pathname) && <Navigation />}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/BlogListPage" element={<BlogListPage />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/Personalposts" element={<Personalposts />} />
        {/* <Route path="/edit/:postId" element={<Edit />} /> */}
        <Route path="/postDetails/:id" element={<PostDetails />} />
        {/* Default Route */}
        <Route path="/" element={<Home />} />{" "}
      </Routes>
    </>
  );
}

export default App;
