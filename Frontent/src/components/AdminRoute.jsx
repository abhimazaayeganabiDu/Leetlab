import { Loader } from 'lucide-react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const AdminRoute = () => {
  const { authUser, isCheckingAuth } = useAuthStore()

  if (isCheckingAuth) {
    return <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  }

  if (!authUser || authUser.data.role !== "ADMIN") return <Navigate to={"/"} />
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AdminRoute