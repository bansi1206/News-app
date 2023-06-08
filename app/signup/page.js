'use client'
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import '../styles/form.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [acceptedFiles, setAcceptedFiles] = useState([]);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };



    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (files) => {
            setAcceptedFiles(files);
        },
    });
    const router = useRouter();

    const handleRegisterIfInvalid = async (e) => {
        e.preventDefault();
        console.log('Có gì đó sai sai')
    }



    const handleRegisterIfValid = async (e) => {
        e.preventDefault();
        const newUser = new FormData();
        newUser.append('username', username);
        newUser.append('password', password);
        newUser.append('email', email);
        newUser.append('role', 'user');

        const file = acceptedFiles[0];

        if (file) {
            const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

            if (acceptedImageTypes.includes(file.type)) {
                newUser.append('avatar', file);
            } else {
                console.log('Vui lòng chỉ tải lên các tệp ảnh (jpg, png, gif)');
                return;
            }
        }

        try {
            const response = await axios.post('http://localhost:3001/register', newUser, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(newUser);

            if (response.status === 200) {
                // Xử lý khi đăng ký thành công
                console.log('Đăng ký thành công!');
                console.log(response.data);

                router.push('/login');
            } else if (response.status === 201) {
                console.log(response.data.error);
            }
            else {
                console.log('Đăng ký thất bại')
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            console.log('Email không hợp lệ')
            handleRegisterIfInvalid(e)
        } else {
            handleRegisterIfValid(e)
        }
    };

    return (
        <form onSubmit={handleRegister} encType='multipart/form-data'>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drag 'n' drop an avatar image here, or click to select a file</p>
                {acceptedFiles.map((file) => (
                    <div key={file.name}>
                        <p>{file.name}</p>
                    </div>
                ))}
            </div>

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;

