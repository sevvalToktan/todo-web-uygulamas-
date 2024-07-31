import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '../firebase/client';
import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';
import { useRouter } from 'next/router';

const Home = () => {
        // Kullanıcı durumunu ve yüklenme durumunu almak için react-firebase-hooks/auth'tan useAuthState kullanımı
    const [user, loading] = useAuthState(firebaseAuth);
        // Kayıt ve giriş formlarını göstermek için durum değişkeni
    const [showSignIn, setShowSignIn] = useState(false); // Başlangıçta kayıt ekranı gösterilen yer

    const router = useRouter();     // Next.js yönlendirmesi için useRouter


    useEffect(() => {
        if (loading) return; 
        if (user) {
            router.push('/todo');
        }
    }, [user, loading, router]);

    return (
        <div>
            <Head>
                <title>To Do App</title>
                <meta name="description" content="To Do App with Firebase Authentication" />
                <link rel="icon" href="" />
            </Head>

            <main className="mt-2">
                {loading ? (
                    <p>Loading...</p>
                ) : !user ? (
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        {showSignIn ? (                         /* Kullanıcı giriş yapmamışsa ya da kayıt/giriş formu göster */

                            <SignInForm setShowSignIn={setShowSignIn} />
                        ) : (
                            <SignUpForm setShowSignIn={setShowSignIn} />
                        )}
                        
                    </div>
                ) : (
                    <p></p>
                )}
            </main>
        </div>
    );
}

export default Home;
