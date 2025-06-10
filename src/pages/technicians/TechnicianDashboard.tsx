
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

const TechnicianDashboard = () => {

  const user = useSelector((state:RootState)=>state.technician)
  console.log("User from store",user)
  return (
    <>
      
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <h1 className="text-4xl text-white font-bold">Welcome</h1>
      </div>
    </>
  );
};

export default TechnicianDashboard;