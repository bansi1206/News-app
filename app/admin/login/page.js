'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/admin-login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();


        if (response.ok) {

            const { id, username, role } = data;
            console.log('User ID:', id);
            console.log(data)

            if (role === 'admin' || role === 'writer') {
                localStorage.setItem('user_id', id);
                router.push('/admin')

            } else {
                toast.error('Access Denied!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } else {
            toast.error(`${data.message}!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <ToastContainer />
            <div className='login-form-container'>
                <div className='container'>
                    <img src='/vercel.svg' />
                    <form onSubmit={handleLogin}>
                        <small id="noteHelp" className="form-text text-muted">You are logging in to admin page</small>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                name='username'
                                aria-describedby="usernameHelp"
                                value={username}
                                placeholder="Enter username"
                                onChange={(e) => setUsername(e.target.value)} />

                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
