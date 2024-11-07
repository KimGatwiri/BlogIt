import React from "react";
import { RiQuillPenFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
function Navigation() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleExploreClick = () => {
    navigate("/explore");
  };
  const handleWriteClick = () => {
    navigate("/write");
  };
  const handleListingClick = () => {
    navigate("/BlogListPage");
  };

  return (
    <>
      <div className="flex gap-96 ">
        <div
          className="text-4xl font-medium flex items-center"
          onClick={handleHomeClick}
        >
          <RiQuillPenFill />
          <p>Blog</p>
          <p className="text-blue-700 font-semibold">It</p>
        </div>
        <div className="flex gap-80">
          <div className="font-semibold flex gap-14 text-center text-lg my-3.5">
            <a
              href="/BlogListPage"
              className="home underline decoration-transparent hover:decoration-blue-500 hover:decoration-4"
              onClick={handleListingClick}
            >
              BlogListing
            </a>
            <a
              href="/writing"
              className="explore underline decoration-transparent hover:decoration-blue-500 hover:decoration-4"
              onClick={handleWriteClick}
            >
              Write
            </a>
            <a
              href="#"
              className="explore underline decoration-transparent hover:decoration-blue-500 hover:decoration-4"
              onClick={handleExploreClick}
            >
              Articles
            </a>
            <a
              href=""
              className="explore underline decoration-transparent hover:decoration-blue-500 hover:decoration-4"
              onClick={handleListingClick}
            >
              My Blogs
            </a>
            <a
              href="#"
              className="explore underline decoration-transparent hover:decoration-blue-500 hover:decoration-4"
              onClick={handleExploreClick}
            >
              My Profile
            </a>
          </div>

          <div className="flex gap-10 text-xl ">
            <button
              className="login bg-blue-400 text-gray-50 rounded p-2 "
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="signup bg-blue-800 text-gray-50 rounded p-2 "
              onClick={handleSignupClick}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
