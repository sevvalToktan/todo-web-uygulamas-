# ToDo Web Application

Bir todo uygulamasıdır. Firebase Authentication kullanarak kullanıcı girişi ve kaydı sağlar ve görevleri ekleyip yönetmenizi sağlar. Ayrıca, görevleri tamamlanmış ve tamamlanmamış olarak iki sekmede görüntüleyebilir ve arama yapabilirsiniz.

## Özellikler

- **Kullanıcı Kimlik Doğrulama:** Firebase Authentication kullanarak kullanıcı girişi ve kaydı yapabilirsiniz.
- **Görev Yönetimi:** Görev ekleyebilir, tamamlayabilir ve silebilirsiniz.
- **Sekmeler:** Görevleri "Tamamlanmış" ve "Tamamlanmamış" olarak iki sekmede görüntüleyebilirsiniz.
- **Arama:** Görevler arasında arama yapabilirsiniz.
- **Responsive Tasarım:** Uygulama, mobil ve masaüstü cihazlarda uyumludur.

## Teknolojiler

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Firebase (Firestore, Authentication)
- **State Management:** React Hooks (useState, useEffect)
- **Routing:** Next.js Routing

## Kurulum

### Ön Koşullar

- [Node.js](https://nodejs.org/) ve [npm](https://www.npmjs.com/) kurulu olmalıdır.
- Firebase projesi oluşturulmuş ve Firebase yapılandırma dosyaları alınmış olmalıdır.

### Adımlar

1. **Projeyi Klonlayın**

   ```bash
   git clone https://github.com/kullanici_adiniz/todo-web-uygulamasi.git
   cd todo-web-uygulamasi

   Bağımlılıkları Yükleyin

2. Bağımlılıkları Yükleyin
   npm install


3.Firebase Yapılandırmasını Ayarlayın
firebase/client.ts dosyasını oluşturun ve Firebase yapılandırma bilgilerinizi ekleyin.

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase yapılandırma bilgileri
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const firestore = getFirestore(app);

export { firebaseAuth, firestore };


4.Uygulamayı Çalıştırın
npm run dev / yarn dev

Tarayıcınızda http://localhost:3000 adresine giderek uygulamayı görebilirsiniz.







