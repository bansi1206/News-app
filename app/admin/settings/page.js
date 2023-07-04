import AdminHeader from "@/app/components/Admin-header"
import Sidebar from "@/app/components/Sidebar"
const Settings = () => {
    return (
        <div>
            <AdminHeader />
            <div className="d-flex">
                <Sidebar />
                <div className="page-body">
                    <div className="container">
                        This is Settings page
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings