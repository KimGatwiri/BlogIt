import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { API_BASE } from "../utils/apibase";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (userobj) => {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        body: JSON.stringify(userobj),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      return response;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const response = await mutateAsync({ emailAddress: email, password });
      if (response.ok) {
        toast("Login successful!");
        navigate("/BlogListPage");
      }
    } catch (error) {
      toast("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-[#3399CC]">
          Welcome to BlogIt
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-[#3399CC]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-lg border border-[#A6E3E9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3399CC] transition duration-200"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-[#3399CC]">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-lg border border-[#A6E3E9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3399CC] transition duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-[#3399CC] rounded-md hover:bg-[#287a91] focus:outline-none transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Log In"}
          </button>
          <p className="text-base text-center text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#3399CC] cursor-pointer hover:underline transition duration-200"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
