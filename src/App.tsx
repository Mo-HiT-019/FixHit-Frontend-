

import { Routes, Route, Navigate } from "react-router-dom";
import UserLogin from './pages/user/UserLogin'
import UserSignup from "./pages/auth/user/UserSignup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VerifyOtpPage from "./pages/auth/user/VerifyOtp";
import AdminLogin from "./pages/auth/admin/AdminLogin";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import TechnicianSignup from "./pages/auth/technician/TechnicianSignup";
import TechnicianLogin from "./pages/auth/technician/TechnicianLogin";
import VerifyOtpTech from "./pages/auth/technician/VerifyOtpTech";
import AdminLayout from "./components/layouts/admin/AdminLayout";
import UserHomePage from "./pages/user/UserHomePage";





function App() {
  

  return (
    <>
    
      <Routes>

        <Route path='/' element={<Navigate to='/users/login'/>}/>

        <Route path='/users'>

          <Route path='signup' element={<UserSignup/>}/>
          <Route path='login' element ={<UserLogin/>}/>
          <Route path='verify-otp' element={<VerifyOtpPage/>}/>
          <Route path='home' element={<UserHomePage/>}/>


        </Route>


        


        <Route path="/technicians">

        <Route path='signup' element={<TechnicianSignup/>}/>
        <Route path='login' element={<TechnicianLogin/>}/>
        <Route path='verify-otp' element={<VerifyOtpTech/>}/>

        
        

        </Route>



        <Route path="/admin/login" element={<AdminLogin />} />
          
        <Route path="/admin" element={<AdminLayout />}>
    
        <Route path="users" element={<AdminUsersPage />} />
        </Route>

        


      </Routes>
       
    </>
  )
}

export default App
