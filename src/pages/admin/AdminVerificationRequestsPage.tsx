import React, { useEffect, useState } from 'react';
import axios from '@/api/axiosAdmin';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

interface Technician {
  _id: string;
  fullname: string;
  email: string;
  mobile?: string;
  profilePic?: string;
}

const AdminVerificationRequestsPage: React.FC = () => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const res = await axios.get('admin/technicians/verification-requests');
        setTechnicians(res.data.technicians);
      } catch (err) {
        console.error('Failed to fetch verification requests:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTechnicians();
  }, []);

  const handleViewClick = (id: string) => {
    navigate(`/admin/technicians/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 lg:p-8 space-y-6">

        <div className="flex items-center gap-4 mb-6 border-b pb-4">
          <ShieldCheckIcon className="h-9 w-9 text-indigo-600" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Technicians Awaiting Verification
          </h2>
        </div>

        {loading ? (
          <div className="text-center text-indigo-600 font-medium py-8">
            Loading verification requests...
          </div>
        ) : technicians.length === 0 ? (
          <div className="text-center text-gray-500 text-base py-8">
            No verification requests found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Profile</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Full Name</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mobile</th>
                  <th className="py-3 px-6 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {technicians.map((tech) => (
                  <tr key={tech._id} className="text-center hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <img
                        src={tech.profilePic}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover mx-auto border border-gray-200 shadow-sm"
                      />
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{tech.fullname}</td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{tech.email}</td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{tech.mobile || 'N/A'}</td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <button
                        onClick={() => handleViewClick(tech._id)}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
                      >
                        <FaEye className="h-4 w-4 mr-2" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVerificationRequestsPage;