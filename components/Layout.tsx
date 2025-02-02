import React from "react";
import { User } from 'firebase/auth';
import Header from "@/components/Header";
import Loader from "@/components/Loader"; 


type LayoutProps = {
  currentUser: User | null;
  loading: boolean;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ currentUser, loading, children }) => {
  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {loading ? (
          <Loader color = {"fff"} size = {40} />
        ) : (
            <>
            {currentUser && <Header /> }
          <main>{children}</main>
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
