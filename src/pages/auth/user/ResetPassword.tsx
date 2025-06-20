import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import Header from "@/components/layouts/Header";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const email = useLocation().state?.email;
  const navigate = useNavigate();

   useEffect(()=>{
    if(!email){
        navigate("/forgot-password")
    }
   },[email])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/users/reset-password", { email, password });
      toast.success("Passord Reset success..")
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Password reset failed");
      toast.error("Password reset failed")
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
          <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>

          <form onSubmit={handleReset}>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
