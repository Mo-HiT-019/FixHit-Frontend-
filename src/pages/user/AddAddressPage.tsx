import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "@/api/axios";

const keralaDistricts = [
  "Alappuzha",
  "Ernakulam",
  "Idukki",
  "Kannur",
  "Kasaragod",
  "Kollam",
  "Kottayam",
  "Kozhikode",
  "Malappuram",
  "Palakkad",
  "Pathanamthitta",
  "Thiruvananthapuram",
  "Thrissur",
  "Wayanad",
];

const AddAddressPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    residential: "",
    city: "",
    district: "", 
    state: "Kerala", 
    pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/users/user-update",{address:form});
      if (res.data.success) {
        toast.success("Address added successfully!");
        navigate("/user/profile");
      } else {
        toast.error("Failed to add address");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6 transform hover:scale-105 transition-transform duration-500 ease-in-out"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Add New Address
        </h2>

        {["residential", "city", "district", "state", "pincode"].map((field) => (
          <div key={field} className="relative z-0 w-full group">
            {field === "district" ? (
              <>
                <select
                  name={field}
                  id={`floating_${field}`}
                  value={form.district}
                  onChange={handleChange}
                  required
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                >
                  <option value="" disabled hidden>Select District</option>
                  {keralaDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor={`floating_${field}`}
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 capitalize"
                >
                  District
                </label>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name={field}
                  id={`floating_${field}`}
                  value={(form as any)[field]}
                  onChange={handleChange}
                  required={field !== "state"}
                  readOnly={field === "state"}
                  className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer ${
                    field === "state" ? "bg-gray-50 cursor-not-allowed" : ""
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor={`floating_${field}`}
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 capitalize"
                >
                  {field}
                </label>
              </>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out transform hover:scale-100"
        >
          Save Address
        </button>
      </form>
    </div>
  );
}; 

export default AddAddressPage;