import { useState } from "react";

import axiosInstanceAdmin from "@/api/axiosAdmin";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layouts/Header";
import { setAdmin } from "@/redux/slices/adminSlice";
import { useDispatch } from "react-redux";
import {toast} from 'react-toastify'


const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleLogin = async () => {
    try {
      const res=await axiosInstanceAdmin.post("/admin/login", { username, password });
      console.log(res.data)
      dispatch(setAdmin(res.data.admin)); 
      toast.success("Login successful!", {
        position: "top-right", 
        autoClose: 2000,       
      });
      navigate("/admin/dashboard");
    } catch (err: any) {
      toast.error("Invalid Credentials",{
        position:"top-center",
        autoClose:3000
      })
      console.log(err.response?.data?.message);
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
          <h2 className="text-2xl text-white mb-4 text-center">Admin Login</h2>

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
            onClick={handleLogin}
            className="bg-white text-black px-4 py-2 rounded w-full"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
