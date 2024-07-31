import React from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebaseAuth } from "../firebase/client";

// FirebaseUI yapılandırma ayarları
const uiConfig = {
  signInFlow: 'popup', // Kullanıcı giriş işleminin popup olarak yapılmasını sağlar
  signInSuccessUrl: '/signedIn', // Başarılı girişten sonra yönlendirilmesi gereken URL
};

const Auth = () => {
  return (
    <div>
      {/* FirebaseUI bileşeni. Bu bileşen kullanıcıya giriş seçeneklerini sunar. */}
      <StyledFirebaseAuth
        uiConfig={uiConfig} // FirebaseUI yapılandırma ayarlarını buraya geçiriyoruz
        firebaseAuth={firebaseAuth} 
      />
    </div>
  );
};

export default Auth;
