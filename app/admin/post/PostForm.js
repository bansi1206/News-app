'use client'
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import "../../styles/form.css"

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedMenu, setSelectedMenu] = useState('');
    const [selectedMenuItem, setSelectedMenuItem] = useState('');
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [menu, setMenu] = useState([]);
    const [menuItem, setMenuItem] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (files) => {
            setAcceptedFiles(files);
        },
    });


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


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('menu_id', selectedMenu);
        formData.append('menu_item_id', selectedMenuItem);


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

    };

    const handleMenuChange = (e) => {
        setSelectedMenu(e.target.value);
        console.log('Selected menu ID:', selectedMenu);
    };

    const handleMenuItemChange = (e) => {
        setSelectedMenuItem(e.target.value);
        console.log('Selected menu item ID:', selectedMenuItem);
    };


    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} encType='multipart/form-data'>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drag 'n' drop a cover image here, or click to select a file</p>
                {acceptedFiles.map((file) => (
                    <div key={file.name}>
                        <p>{file.name}</p>
                    </div>
                ))}
            </div>

            <label htmlFor="content">Content</label>
            <textarea type="text" id="content" value={content} onChange={(e) => setContent(e.target.value)} />

            <label htmlFor="menu">Menu</label>
            <select id="menu" value={selectedMenu} onChange={handleMenuChange}>
                <option value="">Select a menu</option>
                {menu.map((menu) => (
                    <option key={menu._id} value={menu._id}>{menu.title}</option>
                ))}
            </select>

            <label htmlFor="menu-item">Menu Item</label>
            <select id="menu-item" value={selectedMenuItem} onChange={handleMenuItemChange}>
                <option value="">Select a menu item</option>
                {menuItem.map((menuItem) => (
                    <option key={menuItem._id} value={menuItem._id}>{menuItem.title}</option>
                ))}
            </select>

            <button type="submit">Submit</button>
        </form>
    );
};

export default PostForm;