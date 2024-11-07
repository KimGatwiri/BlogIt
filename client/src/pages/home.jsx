import React from "react";
import Hero from "../assets/images/Hero.jpg";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div
      className="relative m-2.5 bg-cover bg-center h-screen w-full"
      style={{
        backgroundImage: `url(${Hero})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-current opacity-70"></div>

      {/* Content goes here */}
      <div className="flex-col relative flex items-center justify-center h-full text-white z-10">
        <h1 className="m-3.5 text-white text-7xl font-bold">
          Welcome To BlogIt
        </h1>
        <h1 className="text-white text-5xl font-bold">Unlocking insights</h1>
        <p className="mt-4 text-lg">Your guide to better life.</p>
        <div className=" m-3.5 flex gap-10 text-xl ">
          <button
            className=" bg-blue-500 hover:bg-blue-200 text-gray-50 hover:text-gray-900 rounded-2xl p-3 "
            onClick={handleLoginClick}
          >
            Start Writing
          </button>
          <button
            className=" bg-blue-800 hover:bg-blue-200 text-gray-50  hover:text-gray-900 rounded-2xl  p-3 "
            onClick={handleSignupClick}
          >
            Explore stories
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

//
