'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getUsers');
                setUsers(response.data);
            } catch (error) {
                console.log('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3001/deleteUser/${userId}`);
            // TODO: Handle success delete
            console.log('User deleted successfully');
            setUsers(users.filter(users => users._id !== userId));
        } catch (error) {
            console.log('Error deleting user:', error);
        }
    };


    return (
        <div>
            <h2>User Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td><Link href={`/admin/account/update-user/${user._id}`}>{user.username}</Link></td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link href={`/admin/account/update-user/${user._id}`}>Edit</Link>
                                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;

