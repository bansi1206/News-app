"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/form.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Gửi dữ liệu đăng nhập đến backend (server.js)
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Xử lý kết quả từ backend
        const data = await response.json();

        // Kiểm tra kết quả xác thực từ backend
        if (data.success) {
            // Xử lý khi đăng nhập thành công (chuyển đến trang chính)
            console.log('Đăng nhập thành công!');
            router.push('/');
            // Thực hiện chuyển hướng đến trang chính
            // Ví dụ: router.push('/dashboard');
        } else {
            // Xử lý khi đăng nhập thất bại
            console.log('Đăng nhập thất bại!');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
};


export default Login;
