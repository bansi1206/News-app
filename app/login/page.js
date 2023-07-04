"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameFocused, setUsernameFocused] = useState(false);
    const [isPasswordFocused, setPasswordFocused] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (userId) {
            router.push('/login');
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
            router.push('/');
        } else {
            // Xử lý khi đăng nhập thất bại
            console.log('Đăng nhập thất bại!');
        }
    }


    return (
        <div>
            <Header />
            <div className='login-container'>
                <div className='breadcrumb-wrapper'>
                    <div className='container'>
                        <nav aria-label='breadcrumb'>
                            <ol className='breadcrumb d-flex align-items-center mt-4'>
                                <li><a href='/'>Home</a></li>
                                <li><span className='dash'>/</span><span className='login'>Login</span><span className='dash'></span></li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className='banner'>
                    <div className='container'>
                        <div className='row align-items-center'>
                            <div className='col-lg-12'>
                                <h2>Login</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='login-form-section'>
                    <div className='container'>
                        <form className='login-form row no-gutters' onSubmit={handleLogin}>
                            <div className={`form-group col-12 ${isUsernameFocused || username ? 'focused' : ''}`}>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onFocus={() => setUsernameFocused(true)}
                                    onBlur={() => setUsernameFocused(false)}
                                />
                            </div>
                            <div className={`form-group col-12 ${isPasswordFocused || password ? 'focused' : ''}`}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                />
                            </div>
                            <div className='submit-section col-12 d-flex flex-column align-items-center'>
                                <button className='btn btn-primary' type="submit">Login</button>
                                <div className='extra-function'>
                                    <p>Forgot your Password? <a className='forgot' href='#'>Reset Password</a></p>
                                    <p>Not a member yet? <a className='signup' href='/signup'>Join Us</a></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;

