'use client'
import React, { useState } from 'react';
import axios from 'axios';

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
            <h2>Add User</h2>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="role">Role</label>
            <select id="role" value={role} onChange={handleOption}>
                <option value="user">User</option>
                <option value="writer">Writer</option>
                <option value="admin">Admin</option>
            </select>
            <button onClick={handleAddUser}>Add</button>
        </div>
    );
};

export default UserAddForm;

