import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "@/api/axios";
import Header from "@/components/layouts/Header";

const VerifyOtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300); 
  const [resending, setResending] = useState(false);

  const formData = location.state?.formData;

  useEffect(() => {
    if (!formData) {
      navigate("/users/signup");
    }
  }, [formData, navigate]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleVerify = async () => {
    try {
      const { email, ...restData } = formData;

      const response = await axios.post("/users/verify-register", {
        email,
        otp,
        ...restData,
      });

      alert("Signup successful!");
      navigate("/users/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);
      await axios.post("/users/request-otp", { email: formData.email });
      setTimer(300); 
      setResending(false);
      alert("OTP resent to your email.");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to resend OTP");
      setResending(false);
    }
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div>
      <Header />

      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/auth.jpg')" }}
      >
        <div className="bg-black bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl text-white mb-4 text-center">
            Enter OTP to verify email
          </h2>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 rounded mb-4 w-full text-white placeholder-gray-500"
          />

          <p className="text-white text-sm mb-4 text-center">
            OTP expires in: {minutes}:{seconds.toString().padStart(2, "0")}
          </p>

          <button
            onClick={handleVerify}
            disabled={timer === 0}
            className={`px-4 py-2 rounded w-full ${
              timer === 0
                ? "bg-gray-600 cursor-not-allowed text-white"
                : "bg-white text-black"
            }`}
          >
            Verify & Complete Signup
          </button>

          {timer === 0 && (
            <div className="mt-4 text-center">
              <p className="text-red-500 mb-2">OTP expired.</p>
              <button
                onClick={handleResendOtp}
                disabled={resending}
                className="text-blue-400 hover:underline"
              >
                {resending ? "Resending..." : "Resend OTP"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;

