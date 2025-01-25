// AlertModalContext.jsx
import { createContext, useContext, useState, useCallback } from "react";

const AlertModalContext = createContext();

export const AlertModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info", // 'success', 'error', 'warning', 'info'
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

// AlertModal.jsx
import React, { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

const AlertModal = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  onConfirm,
  showConfirmButton = true,
  confirmText = "OK",
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    const iconClasses = "w-12 h-12";
    switch (type) {
      case "success":
        return <CheckCircleIcon className={`${iconClasses} text-green-500`} />;
      case "error":
        return (
          <ExclamationCircleIcon className={`${iconClasses} text-red-500`} />
        );
      case "warning":
        return (
          <ExclamationTriangleIcon
            className={`${iconClasses} text-yellow-500`}
          />
        );
      default:
        return (
          <InformationCircleIcon className={`${iconClasses} text-blue-500`} />
        );
    }
  };

  const getColors = () => {
    switch (type) {
      case "success":
        return "bg-green-50 text-green-800 ring-green-500/30";
      case "error":
        return "bg-red-50 text-red-800 ring-red-500/30";
      case "warning":
        return "bg-yellow-50 text-yellow-800 ring-yellow-500/30";
      default:
        return "bg-blue-50 text-blue-800 ring-blue-500/30";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                {getIcon()}
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  className="text-lg font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>
          </div>

          {showConfirmButton && (
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto ${getColors()} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                onClick={() => {
                  onConfirm?.();
                  onClose();
                }}
              >
                {confirmText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Usage Example Component
const ExampleComponent = () => {
  const { showModal } = useAlertModal();

  const handleError = () => {
    showModal({
      type: "error",
      title: "Validation Error",
      message: "Please enter a valid phone number.",
      onConfirm: () => {
        // Optional callback when confirmed
        console.log("Error acknowledged");
      },
    });
  };

  return <button onClick={handleError}>Test Error Modal</button>;
};

export { AlertModal };
