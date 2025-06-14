import { useState } from "react";
import axios from "@/api/axios";
import Header from "@/components/layouts/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    mobile:""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequestOtp = async () => {
    try {
      await axios.post("/users/request-otp", { email: formData.email });
      navigate("/verify-otp", { state: { formData } });
    } catch (err: any) {
      console.log(err.response?.data?.message)
      toast.error("Failed to send OTP")
    }
  };

  return (
    <div>
      <Header />

      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/auth.jpg')" }}
      >
        <div className="bg-black bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl text-white font-bold text-center m-2">F!xH!t</h1>
          <h2 className="text-2xl text-white mb-4 text-center">Sign up to FixHit</h2>

          <input
            name="fullname"
            type="text"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            className="border p-2 rounded mb-2 w-full text-white placeholder-gray-500"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded mb-2 w-full text-white placeholder-gray-500"
          />

          <input
            name="mobile"
            type="text"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="border p-2 rounded mb-2 w-full text-white placeholder-gray-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full text-white placeholder-gray-500"
          />

          <button
            onClick={handleRequestOtp}
            className="bg-white text-black font-semibold px-4 py-2 rounded w-full"
          >
            Sign Up
          </button>

          <div className="flex flex-col justify-center items-center text-sm mb-4 mt-2">
              <Link to="/login" className="text-white hover:underline mb-2">
                Already have an account? Login
              </Link>
              <Link to="/technicians/signup" className="text-white font-bold hover:underline">
                Sign up as a Technician
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;

