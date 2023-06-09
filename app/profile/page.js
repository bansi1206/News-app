'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import '../styles/form.css'

const Profile = () => {
    const [user, setUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const router = useRouter();

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (files) => {
            setAcceptedFiles(files);
        },
    });

    useEffect(() => {
        const fetchUserData = async () => {
            // Lấy user_id từ localStorage
            const userId = localStorage.getItem('user_id');

            // Kiểm tra nếu user_id tồn tại
            if (userId) {
                try {
                    // Gọi API endpoint để lấy thông tin người dùng từ server
                    const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                    setUser(response.data);
                } catch (error) {
                    console.log('Error fetching user:', error);
                    router.push('/login'); // Chuyển hướng đến trang login khi có lỗi
                }
            } else {
                router.push('/login'); // Chuyển hướng đến trang login nếu không có user_id
            }
        };
        fetchUserData();
    }, []);
    console.log(user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('user_id');
        const formData = new FormData();
        formData.append('newPassword', newPassword);
        const file = acceptedFiles[0];

        if (file) {
            const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

            if (acceptedImageTypes.includes(file.type)) {
                formData.append('avatar', file);
            } else {
                console.log('Vui lòng chỉ tải lên các tệp ảnh (jpg, png, gif)');
                return;
            }
        }

        try {
            const response = await axios.post(`http://localhost:3001/api/updateUser/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(formData);

            if (response.status === 200) {
                // Xử lý khi đăng ký thành công
                console.log('Cập nhật thành công!');
                console.log(response.data);

            } else if (response.status === 201) {
                console.log(response.data.error);
            }
            else {
                console.log('Cập nhật thất bại')
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    if (user) {
        // Hiển thị thông tin người dùng nếu đã lấy thành công
        return (
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <img src={user.avatar} alt='avatar' style={{ width: '250px', height: '250px' }} />
                <label htmlFor="username">Hi, {user.username}</label>
                <label htmlFor="password">New Password</label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={user.email}
                    contentEditable={false}
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

                <button type="submit">Submit</button>
            </form>
        );
    } else {
        // Hiển thị thông báo khi chưa lấy được thông tin người dùng
        return <div>Loading user information...</div>;
    }


}

export default Profile;
