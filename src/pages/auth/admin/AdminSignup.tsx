import { useState } from "react";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layouts/Header";

const AdminSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("/admin/signup", { username, password });
      alert("Signup successful");
      navigate("/admin/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
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
          <h2 className="text-2xl text-white mb-4 text-center">Admin Signup</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded mb-4 w-full text-white placeholder-gray-500 bg-transparent"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded mb-4 w-full text-white placeholder-gray-500 bg-transparent"
          />

          <button
            onClick={handleSignup}
            className="bg-white text-black px-4 py-2 rounded w-full"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
