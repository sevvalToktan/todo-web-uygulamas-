import "../styles/globals.css";
import { AppProps } from 'next/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth } from "../firebase/client";
import Layout from '@/components/Layout';
import { User } from 'firebase/auth';

function MyApp({ Component, pageProps }: AppProps) {
    const [user, loading, error] = useAuthState(firebaseAuth);

    // undefined durumunda user'a null atanıyor
    return (
        <Layout currentUser={user ?? null} loading={loading}>
            <Component {...pageProps} currentUser={user ?? null} />
        </Layout>
    );
}

export default MyApp;
