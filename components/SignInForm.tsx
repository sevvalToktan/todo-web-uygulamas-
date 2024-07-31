import { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../firebase/client';

// SignInForm bileşeni için prop tipini tanımlıyoruz. Burada, setShowSignIn adlı bir fonksiyon bekleniyor.
interface SignInFormProps {
  setShowSignIn: (show: boolean) => void;
}

// SignInForm bileşeni
const SignInForm: React.FC<SignInFormProps> = ({ setShowSignIn }) => {
  // Email ve şifre için state değişkenleri tanımlanıyor.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Hata mesajlarını ve yüklenme durumunu yönetmek için state değişkenleri tanımlanıyor.
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Kullanıcının yönlendirilmesi için Next.js router kullanılıyor.
  const router = useRouter();

  // Kullanıcının oturum açma işlemi için fonksiyon.
  const handleSignIn = async () => {
    setLoading(true);  // Yüklenme durumunu başlatıyoruz.
    setError(null);    // Hata mesajını sıfırlıyoruz.
    try {
      // Firebase Authentication ile email ve şifreyi kullanarak oturum açıyoruz.
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      router.push('/todo'); // Başarılı olursa kullanıcıyı "/todo" sayfasına yönlendiriyoruz.
    } catch (error: any) {
      setError(error.message); // Bir hata oluşursa hata mesajını state'e kaydediyoruz.
    } finally {
      setLoading(false); // İşlem bittikten sonra yüklenme durumunu durduruyoruz.
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl mb-4">Sign In</h2> {/* Sayfa başlığı */}
      <form>
        <div className="mb-4">
          {/* Email girişi için etiket ve input alanı */}
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Kullanıcı email girdiğinde state'i güncelliyoruz.
          />
        </div>
        <div className="mb-6">
          {/* Şifre girişi için etiket ve input alanı */}
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Kullanıcı şifre girdiğinde state'i güncelliyoruz.
          />
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>} {/* Hata varsa gösteriyoruz */}
        <div className="flex items-center justify-between">
          {/* Oturum açma butonu */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSignIn}
            disabled={loading} // Yüklenirken buton pasif hale getiriliyor.
          >
            {loading ? 'Signing In...' : 'Sign In'} {/* Yüklenme durumuna göre buton yazısı değişiyor */}
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        {/* Kayıt olma linki, bu butona tıklayınca sign up formuna geçiş yapılıyor */}
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => setShowSignIn(false)}
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
