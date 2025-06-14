import React, { useEffect, useState } from 'react';
import axios from '@/api/axiosAdmin'; 
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserCircleIcon, IdentificationIcon, AcademicCapIcon, MapPinIcon, DocumentTextIcon, CheckCircleIcon, PhotoIcon } from '@heroicons/react/24/outline'; // Importing heroicons, added PhotoIcon

interface Technician {
  _id: string;
  fullname: string;
  email: string;
  mobile?: string;
  profilePic?: string;
  dob?: string;
  gender?: string;
  address?: {
    residential: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
  };
  experience?: string;
  certification?: string;
  services?: string[];
  documents?: string[];
  verificationId?: string[]; 
  isVerified?: boolean;
  verificationRequested?: boolean; 
}

const TechnicianDetailPage: React.FC = () => {
  const { id } = useParams();
  const [technician, setTechnician] = useState<Technician | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTechnician = async () => {
      try {
        setLoading(true);
       
        const res = await axios.get(`admin/technicians/${id}`);
        setTechnician(res.data.technician);
      } catch (err) {
        toast.error('Failed to load technician details');
        console.error('Fetch technician error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTechnician();
  }, [id]);

  const handleVerify = async () => {
    try {
      
      await axios.patch(`/admin/technicians/verify/${id}`);
      toast.success('Technician verified successfully');
      setTechnician(prev => prev ? { ...prev, isVerified: true } : null);
      navigate('/admin/verification-requests'); 
    } catch (err) {
      toast.error('Failed to verify technician');
      console.error('Verify technician error:', err);
    }
  };

  const handleGoBack = () => {
    navigate('/admin/verification-requests');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading technician details...</p>
      </div>
    );
  }

  if (!technician) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <p className="text-xl text-red-600">Technician not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 lg:p-8 space-y-8">

        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Technician Details
          </h2>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-150 ease-in-out font-medium"
          >
            Back to Requests
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
          <div className="flex-shrink-0">
            <img
              src={technician.profilePic || 'https://via.placeholder.com/160/F3F4F6/9CA3AF?text=No+Image'}
              alt="Profile"
              className="w-40 h-40 object-cover rounded-lg shadow-md border border-gray-200"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 flex-grow">
            <p className="text-gray-800 flex items-center"><UserCircleIcon className="h-5 w-5 mr-2 text-gray-500" /><strong>Name:</strong> {technician.fullname}</p>
            <p className="text-gray-800 flex items-center"><UserCircleIcon className="h-5 w-5 mr-2 text-gray-500" /><strong>Email:</strong> {technician.email}</p>
            <p className="text-gray-800 flex items-center"><UserCircleIcon className="h-5 w-5 mr-2 text-gray-500" /><strong>Mobile:</strong> {technician.mobile || 'N/A'}</p>
            <p className="text-gray-800 flex items-center"><UserCircleIcon className="h-5 w-5 mr-2 text-gray-500" /><strong>Gender:</strong> {technician.gender || 'N/A'}</p>
            <p className="text-gray-800 flex items-center"><IdentificationIcon className="h-5 w-5 mr-2 text-gray-500" /><strong>DOB:</strong> {technician.dob ? new Date(technician.dob).toLocaleDateString() : 'N/A'}</p>
            <p className="text-gray-800 flex items-center"><AcademicCapIcon className="h-5 w-5 mr-2 text-gray-500" /><strong>Experience:</strong> {technician.experience || 'N/A'} years</p>
            <p className="text-gray-800 flex items-center"><AcademicCapIcon className="h-5 w-5 mr-2 text-gray-500" /><strong>Certification:</strong> {technician.certification || 'N/A'}</p>
            <p className="text-gray-800 flex items-center col-span-1 sm:col-span-2"><MapPinIcon className="h-5 w-5 mr-2 text-gray-500" /><strong>Address:</strong> {technician.address?.residential || 'N/A'}, {technician.address?.city || 'N/A'}, {technician.address?.district || 'N/A'}, {technician.address?.state || 'N/A'} - {technician.address?.pincode || 'N/A'}</p>
           
            <p className="text-gray-800 flex items-center col-span-1 sm:col-span-2"><IdentificationIcon className="h-5 w-5 mr-2 text-gray-500" /><strong>Services:</strong> {technician.services && technician.services.length > 0 ? technician.services.join(', ') : 'N/A'}</p>
            <p className="text-gray-800 flex items-center col-span-1 sm:col-span-2">
                <CheckCircleIcon className="h-5 w-5 mr-2 text-gray-500" /><strong>Status:</strong> {technician.isVerified ? 'Verified' : 'Pending Verification'}
            </p>
          </div>
        </div>

        
        {technician.verificationId && technician.verificationId.length > 0 && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <PhotoIcon className="h-6 w-6 mr-2 text-red-600" /> Verification ID Documents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {technician.verificationId.map((doc, index) => (
                <a
                  key={`verify-${index}`}
                  href={doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-red-300 rounded-lg text-center text-red-600 hover:bg-red-50 hover:border-red-500 transition duration-150 ease-in-out flex flex-col items-center justify-center"
                >
                  <PhotoIcon className="h-10 w-10 text-red-500 mb-2" />
                  <span className="font-medium">View ID Document {index + 1}</span>
                  <span className="text-xs text-gray-500 truncate w-full">{doc.split('/').pop()}</span>
                </a>
              ))}
            </div>
          </div>
        )}
        

        {technician.documents && technician.documents.length > 0 && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <DocumentTextIcon className="h-6 w-6 mr-2 text-gray-600" /> Supporting Documents (Certifications etc.)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {technician.documents.map((doc, index) => (
                <a
                  key={`doc-${index}`}
                  href={doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-gray-300 rounded-lg text-center text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition duration-150 ease-in-out flex flex-col items-center justify-center"
                >
                  <DocumentTextIcon className="h-10 w-10 text-blue-500 mb-2" />
                  <span className="font-medium">View Document {index + 1}</span>
                  <span className="text-xs text-gray-500 truncate w-full">{doc.split('/').pop()}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          {!technician.isVerified && (
            <button
              onClick={handleVerify}
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 flex items-center"
            >
              <CheckCircleIcon className="h-6 w-6 mr-3" /> Mark as Verified
            </button>
          )}
           {technician.isVerified && (
            <span className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg">
                Already Verified
            </span>
           )}
        </div>

      </div>
    </div>
  );
};

export default TechnicianDetailPage;