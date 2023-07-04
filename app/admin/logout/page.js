'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Logout = () => {
    const router = useRouter();
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        const logout = async () => {
            // Xóa user_id từ localStorage
            localStorage.removeItem('user_id');

            const interval = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
            }, 1000);

            // Delay for 5 seconds
            await new Promise((resolve) => setTimeout(resolve, 5000));

            clearInterval(interval);

            // Chuyển hướng đến trang login sau khi logout
            router.push('/admin/login');
        };

        logout();
    }, []);

    return <div>Logout Successful. Redirecting in {counter} seconds...</div>;
};

export default Logout;
