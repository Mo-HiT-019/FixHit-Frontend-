import { useEffect, useState } from "react";
import axiosInstanceAdmin from "@/api/axiosAdmin"; 
import { MagnifyingGlassIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const AdminUsersPage = () => {
  const [users, setUsers] = useState<any[]>([]); 
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  
  interface User {
    _id: string;
    fullname: string;
    email: string;
    mobile?: string;
    isBlocked: boolean;
   
  }

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstanceAdmin.get("/admin/users", {
        params: { search },
      });
      console.log(response.data);
      setUsers(response.data);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockToggle = async (id: string, isBlocked: boolean) => {
    try {
      const action = isBlocked ? "unblock" : "block";
      await axiosInstanceAdmin.patch(`/admin/users/${id}/${action}`);
    
      fetchUsers();
    } catch (err: any) {
      console.error("Error toggling block status:", err);
      alert(err.response?.data?.message || "Action failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]); 

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 lg:p-8 space-y-6">
      
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
          <UserGroupIcon className="h-9 w-9 text-black" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            User Management
          </h2>
        </div>

   
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="pl-10 pr-4 py-2.5 rounded-lg w-full max-w-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base text-gray-800"
          />
        </div>

        
        {loading && (
          <div className="text-center text-blue-600 font-medium py-8">
            Loading users...
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 font-medium py-8">
            Error: {error}
          </div>
        )}

    
        {!loading && !error && (
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="py-3 px-6 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-6 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500 text-base">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user: User) => ( 
                    <tr key={user._id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                      <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.fullname}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                        {user.email}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                        {user.mobile || "N/A"}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-center">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isBlocked
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-center">
                        <button
                          onClick={() =>
                            handleBlockToggle(user._id, user.isBlocked)
                          }
                          className={`px-4 py-2 rounded-lg text-white font-medium shadow-sm transition duration-200 ease-in-out ${
                            user.isBlocked
                              ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                              : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                          } focus:outline-none focus:ring-2 focus:ring-opacity-75`}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;