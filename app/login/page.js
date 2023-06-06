"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            console.log('Username:', username);

            const result = await signIn('credentials', {
                redirect: false,
                username,
                password
            });

            console.log(result);

            if (result?.error) {
                // Xử lý lỗi đăng nhập
                console.log('Đăng nhập thất bại:', result.error);
            } else {
                // Đăng nhập thành công
                console.log('Đăng nhập thành công!');
                router.push('/profile'); // Chuyển hướng đến trang profile
            }
        } catch (error) {
            // Xử lý lỗi
            console.log('Đăng nhập thất bại:', error);
        }
    };

    return (
        <form onSubmit={handleSignIn}>
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

