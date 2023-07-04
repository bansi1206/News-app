'use client'
import Sidebar from "@/app/components/Sidebar";
import AdminHeader from "../components/Admin-header";
import '../styles/dashboard.css';


const Admin = () => {
    // Lấy dữ liệu từ nguồn dữ liệu (API, state, ...)
    const totalUsers = 100; // Tổng số người dùng
    const totalPosts = 200; // Tổng số bài viết
    const recentActivities = ['Activity 1', 'Activity 2', 'Activity 3']; // Các hoạt động gần đây
    const postViews = [
        { title: 'Post 1', views: 100 },
        { title: 'Post 2', views: 150 },
        { title: 'Post 3', views: 80 },
    ]; // Lượt xem của các bài viết

    return (
        <div>
            <AdminHeader />
            <div className="d-flex">
                <Sidebar />
                <div className="page-body">
                    <div className="container">
                        <div className="dashboard">
                            <div className="card">
                                <h2>Tổng số người dùng</h2>
                                <p>{totalUsers}</p>
                            </div>

                            <div className="card">
                                <h2>Tổng số bài viết</h2>
                                <p>{totalPosts}</p>
                            </div>

                            <div className="card">
                                <h2>Hoạt động gần đây</h2>
                                <ul>
                                    {recentActivities.map((activity, index) => (
                                        <li key={index}>{activity}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="card">
                                <h2>Lượt xem của bài viết</h2>
                                <ul>
                                    {postViews.map((post, index) => (
                                        <li key={index}>
                                            <span>{post.title}</span>
                                            <span>{post.views}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;
