import React from "react";
import { firebaseAuth } from "../firebase/client";
import { Props } from "next/script";




export const Header = (props: Props) => {
    // Kullanıcıyı oturumdan çıkarmak için kullanılan fonksiyon
    const logout = () => {
        firebaseAuth.signOut(); // Firebase Authentication'dan çıkış yapma fonksiyonu
    }
};
export default
 Header;
