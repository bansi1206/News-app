'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '@/app/components/Admin-header';
import Sidebar from '@/app/components/Sidebar';
import AdminAccessDenied from '@/app/components/Admin-access-denied';
import '../../../../styles/admin-update-user.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserEditForm = ({ params }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();
    const { userId } = params;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                setUser(response.data);
                setUsername(response.data.username);
                setPassword(response.data.password);
                setEmail(response.data.email);
                setRole(response.data.role);
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, [userId]);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('user_id');

            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                    setUsers(response.data);
                    setLoading(false);
                } catch (error) {
                    console.log('Error fetching user:', error);
                    router.push('/admin/login');
                }
            } else {
                router.push('/admin/login');
            }
        };

        fetchUserData();
    }, []);

    const handleUpdateUser = async () => {
        try {
            await axios.put(`http://localhost:3001/updateUser/${userId}`, {
                username,
                email,
                password,
                role
            });
            toast.success('User updated successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.log('Error updating user:', error);
        }
    };

    const handleOption = (e) => {
        e.preventDefault();
        setRole(e.target.value);
        console.log(role);
    }

    if (!user) {
        return <div>Loading user...</div>;
    }

    return (
        <div>
            {!isLoading ? (
                <div>
                    <AdminHeader />
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
                    <div className='d-flex'>
                        <Sidebar />
                        {users.role === 'admin' ? (
                            <div className='add-user-content-container'>
                                <div className='header-container d-flex'>
                                    <h4>Edit User</h4>
                                    <a className='go-back' href='/admin/account'>Go Back</a>
                                </div>
                                <div class="table-container">
                                    <table>
                                        <thead>
                                            <th colSpan={2}>User Infomation</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Username</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="username"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        disabled='true'
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Password</td>
                                                <td>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Role</td>
                                                <td>
                                                    <select id="role" value={role} onChange={handleOption}>
                                                        <option value="user">User</option>
                                                        <option value="writer">Writer</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button className='btn btn-submit btn-primary' onClick={handleUpdateUser}>Submit</button>
                                </div>
                            </div>
                        ) : (<AdminAccessDenied />)}
                    </div>
                </div>
            ) : (<div></div>)}
        </div>
    );
};

export default UserEditForm;
