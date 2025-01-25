import { createContext, useContext, useState, useCallback } from "react";

const AlertModalContext = createContext();

export const AlertModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info", 
    onConfirm: null,
    showConfirmButton: true,
    confirmText: "OK",
  });

  const showModal = useCallback((config) => {
    setModalConfig({ ...modalConfig, isOpen: true, ...config });
  }, []);

  const hideModal = useCallback(() => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <AlertModalContext.Provider value={{ showModal, hideModal, modalConfig }}>
      {children}
    </AlertModalContext.Provider>
  );
};

export const useAlertModal = () => {
  const context = useContext(AlertModalContext);
  if (!context) {
    throw new Error("useAlertModal must be used within an AlertModalProvider");
  }
  return context;
};