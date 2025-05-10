import { useState } from "react";
import axios from "@/api/axios";
import Header from "@/components/layouts/Header";
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequestOtp = async () => {
    try {
      await axios.post("/users/request-otp", { email: formData.email });
      navigate("/users/verify-otp", { state: { formData } });
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to send OTP");
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
          <h2 className="text-2xl text-white mb-4 text-center">Sign up to FixHit</h2>

          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
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
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full text-white placeholder-gray-500"
          />

          <button
            onClick={handleRequestOtp}
            className="bg-white text-black px-4 py-2 rounded w-full"
          >
            Send OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;

