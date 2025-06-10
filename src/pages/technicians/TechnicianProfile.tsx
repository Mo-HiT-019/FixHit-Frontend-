import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';

const TechnicianProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const technician = useSelector((state: RootState) => state.technician.technician);

  if (!technician) {
    navigate('/technicians/login');
    return null;
  }

  const handleCompleteProfile = () => {
    navigate('/technicians/complete-profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl border border-gray-200 transform hover:scale-105 transition-all duration-300 ease-in-out">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">Technician Profile</h2>

   
        <div className="mb-6 border-b pb-4 border-gray-200">
          <p className="text-lg text-gray-700 mb-2">
            <strong className="font-semibold text-gray-900">Name:</strong> {technician.fullname}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="font-semibold text-gray-900">Email:</strong> {technician.email}
          </p>
        </div>

       
        {!technician.profileCompleted ? (
          <div className="mt-8 text-center p-4 bg-gray-200 border border-black rounded-lg shadow-sm">
            <p className="text-xl font-bold text-black mb-4">Your profile is not verified❗</p>
            <p className="text-md text-gray-400 mb-6">
              Please complete your profile to get verified and get listed for services.
            </p>
            <button
              onClick={handleCompleteProfile}
              className="w-full sm:w-auto bg-black text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition transform hover:-translate-y-0.5"
            >
              Complete and Verify Profile
            </button>
          </div>
        ) : (
       
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-base text-gray-700 mt-6">
            <div className="flex items-center">
              <strong className="font-semibold text-gray-900 w-28">Mobile:</strong>
              <span className="flex-1">{technician.mobile || 'N/A'}</span>
            </div>
            <div className="flex items-center">
              <strong className="font-semibold text-gray-900 w-28">Gender:</strong>
              <span className="flex-1">{technician.gender || 'N/A'}</span>
            </div>
            <div className="flex items-center">
              <strong className="font-semibold text-gray-900 w-28">DOB:</strong>
              <span className="flex-1">
                {technician.dob ? new Date(technician.dob).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="flex items-center">
              <strong className="font-semibold text-gray-900 w-28">Experience:</strong>
              <span className="flex-1">{technician.experience ? `${technician.experience} years` : 'N/A'}</span>
            </div>
            <div className="flex items-center">
              <strong className="font-semibold text-gray-900 w-28">Certification:</strong>
              <span className="flex-1">{technician.certification || 'N/A'}</span>
            </div>
            <div className="flex items-center">
              <strong className="font-semibold text-gray-900 w-28">Wallet:</strong>
              <span className="flex-1">₹{technician.wallet?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex items-center">
              <strong className="font-semibold text-gray-900 w-28">Verified:</strong>
              <span className={`flex-1 ${technician.isVerified ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>
                {technician.isVerified ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center">
              <strong className="font-semibold text-gray-900 w-28">Listed:</strong>
              <span className={`flex-1 ${technician.isListed ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>
                {technician.isListed ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicianProfilePage;