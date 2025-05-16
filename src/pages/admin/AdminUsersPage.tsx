import { useEffect, useState } from "react";
import axios from "@/api/axios";


const AdminUsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/admin/users", {
        params: { search },
      });
      console.log(response.data)
      setUsers(response.data);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to fetch users");
    }
  };

  const handleBlockToggle = async (id: string, isBlocked: boolean) => {
    try {
      await axios.patch(`/admin/users/${id}/${isBlocked ? "unblock" : "block"}`);
      fetchUsers();
    } catch (err: any) {
      alert(err.response?.data?.message || "Action failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4 text-white">User Management</h2>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email"
        className="mb-4 p-2 rounded w-full max-w-md text-black"
      />

      <table className="w-full table-auto text-white">
        <thead>
          <tr className="border-b">
            <th className="py-2">Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b text-center">
              <td className="py-2">{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.isBlocked ? "Blocked" : "Active"}</td>
              <td>
                <button
                  onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                  className={`px-3 py-1 rounded ${
                    user.isBlocked ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;


