import AdminHeader from "../common/admin/Header"
import AdminFooter from "../common/admin/Footer"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <AdminHeader />
                <main className="flex-grow p-4">
                    <Outlet />
                </main>
            <AdminFooter />
        </div>
    )
}

export default AdminLayout