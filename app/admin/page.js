'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/form.css';

const Admin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Gửi dữ liệu đăng nhập đến backend
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Xử lý kết quả từ backend
        const data = await response.json();
        console.log('Response from backend:', data);

        // Kiểm tra kết quả xác thực từ backend
        if (response.ok) {

            const { id, username, role } = data;
            console.log('User ID:', id);
            console.log(data)

            if (role === 'admin' || role === 'writer') {
                // Lưu trữ ID người dùng vào localStorage
                localStorage.setItem('user_id', id);

            } else {
                console.log('Access denied');
            }
        } else {
            console.log('Đăng nhập thất bại!');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Admin;
