import { createContext, useContext, useState } from "react";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({}); // Store uploaded files

  return (
    <ProgressContext.Provider value={{ progress, setProgress, uploadedDocuments, setUploadedDocuments, uploadedFiles, setUploadedFiles  }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
