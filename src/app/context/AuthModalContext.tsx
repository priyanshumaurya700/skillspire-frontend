"use client";

import { createContext, useContext, useState } from "react";

const AuthModalContext = createContext<any>(null);

export const AuthModalProvider = ({ children }: any) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <AuthModalContext.Provider
      value={{
        showLoginModal,
        setShowLoginModal,
        showRegisterModal,
        setShowRegisterModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => useContext(AuthModalContext);