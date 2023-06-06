'use client'
import { useSession } from 'next-auth/react';
import RootLayout from './layout';

const ProfilePage = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <RootLayout><p>Loading...</p></RootLayout>
    }

    if (!session) {
        return <RootLayout><p>Chưa đăng nhập</p></RootLayout>
    }

    return <RootLayout><p>Xin chào, {session.user.name}!</p></RootLayout>
};

export default ProfilePage;



