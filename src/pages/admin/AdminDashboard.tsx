import AdminSidebar from '@/components/layouts/admin/AdminSidebar'
import Header from '@/components/layouts/Header'



const AdminDashboard = () => {
  return (
    <div>
        <Header/>
        <div className='flex'>
        <AdminSidebar/>
        </div>
        
      
    </div>
  )
}

export default AdminDashboard
