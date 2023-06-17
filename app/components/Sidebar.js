import Link from 'next/link';
import '../styles/sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar__menu">
                <li>
                    <Link href="admin/dashboard">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="admin/account">
                        Account
                    </Link>
                </li>
                <li>
                    <Link href="admin/post">
                        Post
                    </Link>
                </li>
                <li>
                    <Link href="admin/menu-management">
                        Menu
                    </Link>
                </li>
                <li>
                    <Link href="admin/settings">
                        Settings
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
