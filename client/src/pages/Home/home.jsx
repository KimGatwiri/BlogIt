// import React from "react";
// import Hero from '../../assets/images/Hero.jpg';
// import { useNavigate } from "react-router-dom";
// // import homeNavigations from "./homeNavigations";
// function Home() {
//   const navigate = useNavigate();
//   const handleSignupClick = () => {
//     navigate("/signup");
//   };

//   const handleLoginClick = () => {
//     navigate("/login");
//   };
//   return (

//     <div
//       className="relative m-2.5 bg-cover bg-center h-screen w-full"
//       style={{
//         backgroundImage: `url(${Hero})`,
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-current opacity-70"></div>

//       {/* Content goes here */}
//       <div className="flex-col relative flex items-center justify-center h-full text-white z-10">
//         <h1 className="m-3.5 text-white text-7xl font-bold">
//           Welcome To BlogIt
//         </h1>
//         <h1 className="text-white text-5xl font-bold">Unlocking insights</h1>
//         <p className="mt-4 text-lg">Your guide to better life.</p>
//         <div className=" m-3.5 flex gap-10 text-xl ">
//           <button
//             className=" bg-blue-500 hover:bg-blue-200 text-gray-50 hover:text-gray-900 rounded-2xl p-3 "
//             onClick={handleSignupClick}
//           >
//             Start Writing
//           </button>
//           <button
//             className=" bg-blue-800 hover:bg-blue-200 text-gray-50  hover:text-gray-900 rounded-2xl  p-3 "
//             onClick={handleSignupClick}
//           >
//             Explore stories
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

// //
import React from "react";
import Hero from "../../assets/images/Hero.jpg";
import { RiQuillPenFill } from "react-icons/ri"; // Import the icon
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // Handle button clicks for Signup and Login
  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleStartWritingClick = () => {
    navigate("/writing"); // Assuming you want to navigate to the writing page
  };

  const handleExploreStoriesClick = () => {
    navigate("/BlogListPage"); // Navigate to blog listing page
  };

  return (
    <div>
      {/* Header with Logo and Auth buttons */}
      <div className="flex items-center justify-between p-4">
        <div className="text-4xl font-medium flex items-center ">
          <RiQuillPenFill />
          <p className="text-5xl">Blog</p>
          <p className="text-5xl text-blue-700 font-semibold">It</p>
        </div>
        <div className="flex gap-10 text-xl">
          <button
            className="login bg-blue-400 text-gray-50 rounded p-2"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            className="signup bg-blue-800 text-gray-50 rounded p-2"
            onClick={handleSignupClick}
          >
            Signup
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-screen w-full"
        style={{
          backgroundImage: `url(${Hero})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Content */}
        <div className="flex-col relative flex items-center justify-center h-full text-white z-10">
          <h1 className="text-7xl font-bold">Welcome To BlogIt</h1>
          <h2 className="text-5xl font-bold">Unlocking insights</h2>
          <p className="mt-4 text-lg">Your guide to a better life.</p>
          <div className="flex gap-10 mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-300 text-gray-50 rounded-2xl p-3"
              onClick={handleSignupClick}
            >
              Start Writing
            </button>
            <button
              className="bg-blue-800 hover:bg-blue-300 text-gray-50 rounded-2xl p-3"
              onClick={handleSignupClick}
            >
              Explore Stories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
