'use client'
import React, { useState } from 'react';
import axios from 'axios';
import AdminHeader from '@/app/components/Admin-header';
import Sidebar from '@/app/components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/admin-add-user.css';

const UserAddForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/addUser', {
                username,
                email,
                password,
                role: role,
                avatar: 'image/default.png' // Đường dẫn mặc định cho avatar
            });

            // TODO: Handle success add
            console.log('User added successfully');
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log('Error adding user:', error);
        }
    };


    const handleOption = (e) => {
        e.preventDefault();
        setRole(e.target.value);
        console.log(role);
    }

    return (
        <div>
            <AdminHeader />
            <div className='d-flex'>
                <Sidebar />
                <div className='add-user-content-container'>
                    <div className='header-container d-flex'>
                        <h4>Add New User</h4>
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
                                            placeholder='Enter username'
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
                                            placeholder='Enter password'
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
                                            placeholder='Enter email'
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
                        <button className='btn btn-submit btn-primary' onClick={handleAddUser}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAddForm;

