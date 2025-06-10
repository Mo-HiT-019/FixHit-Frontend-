import { Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import TechnicianRoutes from "./routes/TechnicianRoutes";
import AdminRoutes from "./routes/AdminRoutes";



function App() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/technicians/*" element={<TechnicianRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}

export default App;
