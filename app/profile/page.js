'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            // Lấy user_id từ localStorage
            const userId = localStorage.getItem('user_id');

            // Kiểm tra nếu user_id tồn tại
            if (userId) {
                try {
                    // Gọi API endpoint để lấy thông tin người dùng từ server
                    const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                    setUser(response.data);
                } catch (error) {
                    console.log('Error fetching user:', error);
                    router.push('/login'); // Chuyển hướng đến trang login khi có lỗi
                }
            } else {
                router.push('/login'); // Chuyển hướng đến trang login nếu không có user_id
            }
        };
        fetchUserData();
    }, []);
    console.log(user)
    if (user) {
        // Hiển thị thông tin người dùng nếu đã lấy thành công
        return (
            <div>
                <h2>Welcome, {user.username}!</h2>
                <p>Email: {user.email}</p>
                <img src="../server/avatar/default.png" />
            </div>
        );
    } else {
        // Hiển thị thông báo khi chưa lấy được thông tin người dùng
        return <div>Loading user information...</div>;
    }


}

export default Profile;
