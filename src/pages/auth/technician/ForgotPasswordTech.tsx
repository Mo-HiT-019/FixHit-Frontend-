import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/api/axios";

import HeaderTechAuth from "@/components/technician/HeaderTechAuth";

const ForgotPasswordTech = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/technicians/request-reset-otp", { email });
      navigate("technicians/verify-reset-otp", { state: { email } });
    } catch (err: any) {
      alert(err.response?.data?.message || "Error sending OTP");
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
          <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordTech;
