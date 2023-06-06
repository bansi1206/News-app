"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/form.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (userId) {
            router.push('/profile');
        }
    }, []);

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
        console.log('Response from backend:', data);

        // Kiểm tra kết quả xác thực từ backend
        if (response.ok) {
            // Xử lý khi đăng nhập thành công
            const { id, username } = data;
            console.log('User ID:', id);

            // Lưu trữ ID người dùng trong localStorage
            localStorage.setItem('user_id', id);
            router.push('/profile');
        } else {
            // Xử lý khi đăng nhập thất bại
            console.log('Đăng nhập thất bại!');
        }
    }

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

export default Login;

