

import { Routes, Route, Navigate } from "react-router-dom";
import UserLogin from './pages/user/UserLogin'
import UserSignup from "./pages/auth/user/UserSignup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VerifyOtpPage from "./pages/auth/user/VerifyOtp";





function App() {
  

  return (
    <>
    
      <Routes>

        <Route path='/' element={<Navigate to='/user/login'/>}/>

        <Route path='/user'>

          <Route path='signup' element={<UserSignup/>}/>
          <Route path='login' element ={<UserLogin/>}/>
          <Route path='`verify-otp' element={<VerifyOtpPage/>}/>


        </Route>


        <Route path="/admin">

        <Route index element = {<AdminDashboard/>}/>

        </Route>

        


      </Routes>
       
    </>
  )
}

export default App
