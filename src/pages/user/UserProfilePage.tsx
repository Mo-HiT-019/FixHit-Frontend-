import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import axiosInstance from '@/api/axios';


const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  const formatDate = (dateString?: Date | string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleAddAddress = () => navigate('/user/add-address');
  const handleViewWallet = () => navigate('/user/wallet');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

 const handleUpload = async () => {
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append("profilePic", selectedFile);

  try {
    const res = await axiosInstance.post("/users/upload-profile-pic", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      toast.success("Profile picture uploaded!");
      setSelectedFile(null);
      window.location.reload(); 
    } else {
      toast.error("Upload failed");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to upload image");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-10 max-w-3xl w-full border border-gray-200">
       
        <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-6 border-b pb-4">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 sm:mb-0">User Profile</h2>
          <button
            onClick={() => navigate('/user/edit-profile')}
            className="bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-white hover:text-black hover:border-2 transition"
          >
            Edit Profile
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          {user.profilePic ? (
            <img
              //src={user.profilePic}
              alt={`${user.fullname}'s profile`}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-md"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/128x128/aabbcc/ffffff?text=${user.fullname.charAt(0)}`;
              }}
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-black text-5xl font-bold border-4 border-gray-700 shadow-md">
              {user.fullname.charAt(0).toUpperCase()}
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            id="profilePicInput"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => document.getElementById('profilePicInput')?.click()}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            Change Profile Picture
          </button>

 
          {selectedFile && (
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-700">{selectedFile.name}</p>
              <button
                onClick={handleUpload}
                className="mt-1 bg-black text-white text-sm px-4 py-1 rounded hover:bg-black"
              >
                Save
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div className="col-span-full">
            <p className="text-lg font-semibold text-gray-800">Full Name:</p>
            <p className="text-xl">{user.fullname}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Email:</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Mobile:</p>
            <p>{user.mobile || 'N/A'}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Gender:</p>
            <p>{user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'N/A'}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Date of Birth:</p>
            <p>{formatDate(user.dob)}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Account Status:</p>
            <p className={`font-semibold ${user.isBlocked ? 'text-red-600' : 'text-green-600'}`}>
              {user.isBlocked ? 'Blocked' : 'Active'}
            </p>
          </div>
        </div>

       
        <div className="mt-10 border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">Saved Addresses</h3>
            <button
              onClick={handleAddAddress}
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Address
            </button>
          </div>
          {user.address && user.address.length > 0 ? (
            <ul className="space-y-4">
              {user.address.map((addr, idx) => (
                <li key={idx} className="p-4 bg-gray-50 rounded-lg shadow-sm border">
                  <p>{addr}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No addresses saved yet.</p>
          )}
        </div>

        
        <div className="mt-10 border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">Wallet</h3>
            <button
              onClick={handleViewWallet}
              className="text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              View Wallet
            </button>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ₹{user.wallet ? user.wallet.toFixed(2) : '0.00'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
