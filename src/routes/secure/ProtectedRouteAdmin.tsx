import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '@/redux/store';

const ProtectedRouteAdmin: React.FC = () =>{
    const isAuthenticated = useSelector((state: RootState) => state.admin.admin);
      return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default ProtectedRouteAdmin;