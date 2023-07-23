'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Logout = () => {
    const router = useRouter();
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        const logout = async () => {
            localStorage.removeItem('user_id');

            const interval = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
            }, 1000);


            await new Promise((resolve) => setTimeout(resolve, 5000));

            clearInterval(interval);


            router.push('/login');
        };

        logout();
    }, []);

    return <div>Logout Successful! Redirecting in {counter} seconds... or click <a href='/login'>here</a> to redirect to login page</div>;
};

export default Logout;
