import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import HeaderTechAuth from "@/components/technician/HeaderTechAuth";
import { useDispatch } from "react-redux";
import { setTechnician } from "@/redux/slices/technicianSlice"; 
import { toast } from "react-toastify";

const TechnicianLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("/technicians/login", { email, password });

      dispatch(setTechnician(res.data.technician)); 
      navigate("/technicians");
    } catch (error: any) {
      toast.error("Invalid credentials..")
      console.log(error.response?.data?.message || "Login failed techys");
    }
  };

  return (
    <>
      <HeaderTechAuth />

      <div
        className="min-h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: "url('/images/auth.jpg')" }}
      >
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md backdrop-blur-sm bg-opacity-90">
          <h1 className="text-3xl font-bold text-center m-2">F!xH!t</h1>
          <h2 className="text-2xl font-bold text-center mb-6">Technician Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm mb-4">
              <Link to="/technicians/forgot-password" className="text-black hover:underline">
                Forgot password?
              </Link>
              <Link to="/technicians/signup-email" className="text-black hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TechnicianLogin;
