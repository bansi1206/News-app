import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { authenticate } from './auth';

const options = {
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { username, password } = credentials;
                const result = await authenticate(username, password);

                if (result.success) {
                    return { id: result.user.id, name: result.user.name };
                } else {
                    return null;
                }
            },
        }),
    ],
    session: {

    },
    callbacks: {

    },
};

export default (req, res) => NextAuth(req, res, options);
