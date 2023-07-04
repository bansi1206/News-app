'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import AdminHeader from '@/app/components/Admin-header';
import Sidebar from '@/app/components/Sidebar';
import '../../styles/admin-menu.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MenuTable = () => {
    const [menu, setMenu] = useState([]);
    const [menuItem, setMenuItem] = useState([]);
    const [currentMenuPage, setCurrentMenuPage] = useState(1);
    const [currentMenuItemPage, setCurrentMenuItemPage] = useState(1);
    const [menuPerPage] = useState(5);
    const [menuItemPerPage] = useState(5);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getMenu');
                setMenu(response.data);
            } catch (error) {
                console.log('Error fetching menu data:', error);
            }
        };

        const fetchMenuItem = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getMenuItem');
                setMenuItem(response.data);
            } catch (error) {
                console.log('Error fetching menu item data:', error);
            }
        };

        fetchMenu();
        fetchMenuItem();
    }, []);

    const indexOfLastMenu = currentMenuPage * menuPerPage;
    const indexOfFirstMenu = indexOfLastMenu - menuPerPage;
    const currentMenu = menu.slice(indexOfFirstMenu, indexOfLastMenu);
    const totalMenuPages = Math.ceil(menu.length / menuPerPage);


    const indexOfLastMenuItem = currentMenuItemPage * menuItemPerPage;
    const indexOfFirstMenuItem = indexOfLastMenuItem - menuItemPerPage;
    const currentMenuItem = menuItem.slice(indexOfFirstMenuItem, indexOfLastMenuItem);
    const totalMenuItemPages = Math.ceil(menuItem.length / menuItemPerPage);

    const handleMenuPageChange = (menuPageNumber) => {
        setCurrentMenuPage(menuPageNumber);
    };

    const handleMenuItemPageChange = (menuItemPageNumber) => {
        setCurrentMenuItemPage(menuItemPageNumber);
    };

    const renderMenuPageNumbers = [...Array(totalMenuPages).keys()].map((menuPageNumber) => (
        <li key={menuPageNumber} className={currentMenuPage === menuPageNumber + 1 ? 'page-active' : ''}>
            <button
                className={currentMenuPage === menuPageNumber + 1 ? 'button-active' : 'button-inactive'}
                onClick={() => handleMenuPageChange(menuPageNumber + 1)}
            >
                {menuPageNumber + 1}
            </button>
        </li>
    ));

    const renderMenuItemPageNumbers = [...Array(totalMenuItemPages).keys()].map((menuItemPageNumber) => (
        <li key={menuItemPageNumber} className={currentMenuItemPage === menuItemPageNumber + 1 ? 'page-active' : ''}>
            <button
                className={currentMenuItemPage === menuItemPageNumber + 1 ? 'button-active' : 'button-inactive'}
                onClick={() => handleMenuItemPageChange(menuItemPageNumber + 1)}
            >
                {menuItemPageNumber + 1}
            </button>
        </li>
    ));



    const handleDeleteMenu = async (menuId) => {
        try {
            await axios.delete(`http://localhost:3001/deleteMenu/${menuId}`);
            // TODO: Handle success delete
            console.log('Menu deleted successfully');
            // Update the menu state after deletion
            setMenu(menu.filter((item) => item._id !== menuId));
        } catch (error) {
            console.log('Error deleting menu:', error);
        }
    };

    const handleDeleteMenuItem = async (menuItem) => {
        try {
            // TODO: Handle delete menu item logic
            console.log('Delete menu item:', menuItem);

            // Delete the menu item from the database
            await axios.delete(`http://localhost:3001/deleteMenuItem/${menuItem._id}`);

            // Update the menuItem state by filtering out the deleted menu item
            setMenuItem((prevMenuItem) => prevMenuItem.filter((item) => item._id !== menuItem._id));

            console.log('Menu item deleted successfully');
        } catch (error) {
            console.log('Error deleting menu item:', error);
        }
    };


    return (
        <div>
            <AdminHeader />
            <div className="d-flex">
                <Sidebar />
                <div className='menu-content-container'>
                    <div className='header-container d-flex'>
                        <h4>Menus</h4>
                        <a className='add-new-post' href='/admin/menu-management/add-menu'>Add New</a>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Menu Title</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentMenu.map((menu) => (
                                    <tr key={menu._id}>
                                        <td>
                                            <Link href={`/admin/menu-management/updte-menu/${menu._id}`}>{menu.title}</Link>
                                        </td>
                                        <td>
                                            <a className='btn btn-primary' href={`/admin/menu-management/update-menu/${menu._id}`}>Edit</a>
                                            <button className='btn btn-danger' onClick={() => handleDeleteMenu(menu._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination d-flex justify-content-center">
                            <ul className='d-flex'>
                                {renderMenuPageNumbers}
                            </ul>
                        </div>
                    </div>
                    <div className='header-container d-flex'>
                        <h4>Menu Items</h4>
                        <a className='add-new-post' href='/admin/menu-management/add-menuItem'>Add New</a>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Menu Item Title</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentMenuItem.map((menuItem) => (
                                    <tr key={menuItem._id}>
                                        <td>
                                            <Link href={`/admin/menu-management/update-menuItem/${menuItem._id}`}>{menuItem.title}</Link>
                                        </td>
                                        <td>
                                            <a className='btn btn-primary' href={`/admin/menu-management/update-menuItem/${menuItem._id}`}>Edit</a>
                                            <button className='btn btn-danger' onClick={() => handleDeleteMenuItem(menuItem)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination d-flex justify-content-center">
                            <ul className='d-flex'>
                                {renderMenuItemPageNumbers}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuTable;
