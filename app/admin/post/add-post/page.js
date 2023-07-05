'use client'
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AdminHeader from '@/app/components/Admin-header';
import Sidebar from '@/app/components/Sidebar';
import AdminAccessDenied from '@/app/components/Admin-access-denied';
import '../../../styles/admin-add-post.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedMenu, setSelectedMenu] = useState('');
    const [selectedMenuItem, setSelectedMenuItem] = useState('');
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [menu, setMenu] = useState([]);
    const [menuItem, setMenuItem] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true)
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    const router = useRouter();
    const editorStyle = {
        maxHeight: '400px',
        overflow: 'auto'
    };


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
                    setLoading(false);
                } catch (error) {
                    console.log('Error fetching user:', error);
                    router.push('/admin/login'); // Chuyển hướng đến trang login khi có lỗi
                }
            } else {
                router.push('/admin/login'); // Chuyển hướng đến trang login nếu không có user_id
            }
        };

        fetchUserData();
    }, []);

    console.log(user)


    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch('http://localhost:3001/getMenu');
                if (response.ok) {
                    const data = await response.json();
                    setMenu(data);

                } else {
                    console.log('Error fetching menu data');
                }
            } catch (error) {
                console.log('Error fetching menu data:', error);
            }
        };

        const fetchMenuItem = async () => {
            try {
                const response = await fetch('http://localhost:3001/getMenuItem');
                if (response.ok) {
                    const data = await response.json();
                    setMenuItem(data);

                } else {
                    console.log('Error fetching menu item data');
                }
            } catch (error) {
                console.log('Error fetching menu item data:', error);
            }
        };

        fetchMenu();
        fetchMenuItem();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('published_at', formattedDate);
        formData.append('menu_id', selectedMenu);
        formData.append('menu_item_id', selectedMenuItem);
        formData.append('author', user.username)
        formData.append('status', 'pending')


        const file = acceptedFiles[0];

        if (file) {
            const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

            if (acceptedImageTypes.includes(file.type)) {
                formData.append('cover', file);
            } else {
                console.log('Vui lòng chỉ tải lên các tệp ảnh (jpg, png, gif)');
                return;
            }
        }

        try {
            const response = await fetch('http://localhost:3001/addPost', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log('Data saved successfully');
                // Xử lý thành công, có thể thực hiện các hành động tiếp theo sau khi gửi thành công dữ liệu
            } else {
                console.log('Error saving data');
                // Xử lý lỗi khi gửi yêu cầu không thành công
            }
        } catch (error) {
            console.log('Error saving data:', error);
            // Xử lý lỗi khi có lỗi kết nối hoặc yêu cầu không thể được gửi
        }

    };

    const handleMenuChange = (e) => {
        setSelectedMenu(e.target.value);
        console.log('Selected menu ID:', selectedMenu);
    };

    const handleMenuItemChange = (e) => {
        setSelectedMenuItem(e.target.value);
        console.log('Selected menu item ID:', selectedMenuItem);
    };

    const handleContentChange = (value) => {
        setContent(value);
    };


    return (
        <div>
            {!isLoading ? (<>
                <AdminHeader />
                <div className='d-flex'>
                    <Sidebar />
                    {user.role === 'admin' || user.role === 'writer' ? (
                        <div className='add-user-content-container'>
                            <div className='header-container d-flex'>
                                <h4>Add New Post</h4>
                                <a className='go-back' href='/admin/post'>Go Back</a>
                            </div>
                            <div class="table-container">
                                <table>
                                    <thead>
                                        <th colSpan={2}>Post Infomation</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Title</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Cover</td>
                                            <td>
                                                <div {...getRootProps()} className="dropzone">
                                                    <input {...getInputProps()} />
                                                    <p>Drag 'n' drop a cover image here, or click to select a file</p>
                                                    {acceptedFiles.map((file) => (
                                                        <div key={file.name}>
                                                            <p>{file.name}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Content</td>
                                            <td>
                                                <ReactQuill style={editorStyle} value={content} onChange={handleContentChange} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Menu</td>
                                            <td>
                                                <select id="menu" value={selectedMenu} onChange={handleMenuChange}>
                                                    <option value="">Select a menu</option>
                                                    {menu.map((menu) => (
                                                        <option key={menu._id} value={menu._id}>{menu.title}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Menu Item</td>
                                            <td>
                                                <select id="menu-item" value={selectedMenuItem} onChange={handleMenuItemChange}>
                                                    <option value="">Select a menu item</option>
                                                    {menuItem.map((menuItem) => (
                                                        <option key={menuItem._id} value={menuItem._id}>{menuItem.title}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button className='btn btn-submit btn-primary' onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    ) : (<AdminAccessDenied />)}
                </div>
            </>) : (<></>)}
        </div>
    );
};

export default PostForm;