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
    const response = await mutateAsync({ emailAddress: email, password });
    try {
      const response = await mutateAsync({ emailAddress: email, password });
      if (response.ok) {
        toast("Login successful!");
        navigate("/Home");
      }
    } catch (error) {
      if (response.ok === false) {
        const error = await response.json();
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E3FDFD]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#71C9CE]">
          Welcome to the Blog
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-base font-medium text-[#71C9CE]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#A6E3E9] rounded-md focus:outline-none focus:ring focus:ring-[#71C9CE]"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-[#71C9CE]">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#A6E3E9] rounded-md focus:outline-none focus:ring focus:ring-[#71C9CE]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-[#71C9CE] rounded-md hover:bg-[#A6E3E9] focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Submit"}
          </button>
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#71C9CE] cursor-pointer hover:underline"
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
