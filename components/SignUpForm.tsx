import { useState } from 'react';
import { firebaseAuth, firestore } from '../firebase/client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

// SignUpForm bileşenine verilen props tanımlanıyor
interface SignUpFormProps {
    setShowSignIn: (show: boolean) => void; // Giriş formunu gösterip göstermeyeceğimizi belirler
}

const SignUpForm: React.FC<SignUpFormProps> = ({ setShowSignIn }) => {
    // Formdaki inputların durumunu yönetmek için kullanılan state'ler
    const [fullName, setFullName] = useState(''); // Kullanıcının tam adı
    const [email, setEmail] = useState(''); // Kullanıcının email adresi
    const [password, setPassword] = useState(''); // Kullanıcının şifresi
    const [error, setError] = useState<string | null>(null); // Hata mesajı
    const [loading, setLoading] = useState(false); // Yüklenme durumunu takip eder

    const handleSignUp = async () => {
        setLoading(true); // Kayıt işlemi başlarken loading durumu true yapılır
        setError(null); // Hata mesajı temizlenir

        // Şifre uzunluğunu kontrol eder. Eğer 8 karakterden kısa ise hata verir.
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setLoading(false); // Hata oluştuğunda yüklenme durumu sona erdirilir
            return;
        }

        try {
            // Firebase ile yeni kullanıcı oluşturulur
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const user = userCredential.user; // Oluşturulan kullanıcı bilgileri alınır
            if (user) {
                // Yeni kullanıcının Firestore'a kaydedilmesi
                const userDoc = doc(collection(firestore, 'users'), user.uid);
                await setDoc(userDoc, {
                    fullName, // Kullanıcının tam adı
                    email, // Kullanıcının email adresi
                    createdAt: new Date(), // Kayıt tarihi
                });
                setShowSignIn(true); // Kayıt tamamlandığında giriş formu gösterilir
            }
        } catch (error: any) {
            setError(error.message); // Hata oluştuğunda hata mesajı ekrana yazılır
        } finally {
            setLoading(false); // Kayıt işlemi tamamlandığında yüklenme durumu sona erdirilir
        }
    };

    return (
        <div>
            <h2 className="text-center text-2xl mb-4">Sign Up</h2> {/* Başlık */}
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                        Full Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="fullName"
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)} // Kullanıcının adını state'e kaydeder
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Kullanıcının emailini state'e kaydeder
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Kullanıcının şifresini state'e kaydeder
                    />
                </div>
                {error && <p className="text-red-500 text-xs italic">{error}</p>} {/* Hata mesajını gösterir */}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSignUp} // Kayıt ol butonuna tıklanıldığında handleSignUp fonksiyonu çağrılır
                        disabled={loading} // Yüklenme durumunda buton devre dışı bırakılır
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'} {/* Yüklenme durumuna göre buton metni */}
                    </button>
                </div>
            </form>
            <div className="text-center mt-4">
                <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => setShowSignIn(true)} // Giriş yap butonuna tıklanıldığında giriş formu gösterilir
                >
                    Already have an account? Sign In
                </button>
            </div>
        </div>
    );
};

export default SignUpForm;
