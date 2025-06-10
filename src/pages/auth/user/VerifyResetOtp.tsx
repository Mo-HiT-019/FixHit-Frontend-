import { useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "@/api/axios";
import Header from "@/components/layouts/Header";

const VerifyResetOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
  if (!email) {
    navigate("/forgot-password"); 
  }
}, [email]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/users/verify-reset-otp", { email, otp });
      navigate("/reset-password", { state: { email } });
    } catch (err: any) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: "url('/images/auth.jpg')" }}
      >
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md backdrop-blur-sm bg-opacity-90">
          <h2 className="text-2xl font-semibold text-center mb-6">Verify OTP</h2>

          <form onSubmit={handleVerify}>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the OTP"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyResetOtp;
