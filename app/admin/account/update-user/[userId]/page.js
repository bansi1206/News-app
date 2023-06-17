'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserEditForm = ({ params }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
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

    const handleUpdateUser = async () => {
        try {
            await axios.put(`http://localhost:3001/updateUser/${userId}`, {
                username,
                email,
                password,
                role
            });
            // TODO: Handle success update
            console.log('User updated successfully');
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
            <h2>Edit User</h2>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled='true'
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
            <button onClick={handleUpdateUser}>Update</button>
        </div>
    );
};

export default UserEditForm;
