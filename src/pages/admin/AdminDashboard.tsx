import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; 

const AdminDashboard = () => {
  
  const adminState = useSelector((state: RootState) => state.admin.admin);

  console.log("Admin from store:", adminState);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-700 text-white m-0 p-4">
    
      <h1 className="text-4xl font-bold mb-4">Welcome, {adminState?.username || 'Admin'}!</h1>
      <p className="text-xl"></p>
    </div>
  );
};

export default AdminDashboard;