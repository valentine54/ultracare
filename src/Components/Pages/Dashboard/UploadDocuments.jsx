import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import { useProgress } from "./ProgressContext";
import { CheckCircle } from "lucide-react";

const UploadDocuments = () => {
  const navigate = useNavigate();
  const {
    uploadedDocuments,
    setUploadedDocuments,
    progress,
    setProgress,
    uploadedFiles,
    setUploadedFiles,
  } = useProgress();

  const [isComplete, setIsComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Required documents
  const requiredDocuments = [
    "National ID/Passport",
    "KRA PIN Certificate",
    "Driving License",
    "Logbook",
    "Valuation Report (for comprehensive cover)",
  ];

  useEffect(() => {
    // Check if all documents are uploaded
    if (progress === 100) {
      setIsComplete(true);
    }
  }, [progress]);

  const handleFileUpload = (event, docName) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles((prevFiles) => ({
        ...prevFiles,
        [docName]: file.name,
      }));

      if (!uploadedDocuments.includes(docName)) {
        const updatedDocuments = [...uploadedDocuments, docName];
        setUploadedDocuments(updatedDocuments);

        const totalDocuments = requiredDocuments.length;
        const newProgress = Math.round(
          (updatedDocuments.length / totalDocuments) * 100
        );
        setProgress(newProgress);
      }
    }
  };

  const handleProceedToPayment = () => {
    if (isComplete) {
      setShowSuccess(true);
      // Redirect after showing success message
      setTimeout(() => {
        navigate("/user-dashboard/payments?filter=pending");
      }, 1200);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {showSuccess ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Documents Uploaded Successfully!
          </h3>
          <p className="text-gray-600 mb-4">
            Redirecting you to payments page...
          </p>
          <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto">
            <div className="h-1 bg-blue-500 rounded-full animate-progress"></div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-5">
            Car Insurance Quote In Progress
          </h2>

          <div className="bg-white rounded-lg shadow-md p-5 mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    src="/src/assets/FirstAssurance.png"
                    alt="Insurance Logo"
                    className="h-12 w-auto"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/120x40?text=Insurance")
                    }
                  />
                </div>
                <div>
                  <p className="font-medium">Upload progress</p>
                  <div className="w-64 bg-gray-200 rounded-full h-2.5 mt-1">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <span className="text-sm font-medium">{progress}% Complete</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {requiredDocuments.map((doc, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
              >
                <label className="block font-medium mb-2">{doc}</label>
                <div
                  className={`flex justify-between items-center border p-3 rounded-md cursor-pointer
                    ${
                      uploadedFiles[doc]
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50"
                    }`}
                >
                  <span
                    className={`${
                      uploadedFiles[doc] ? "text-blue-700" : "text-gray-500"
                    }`}
                  >
                    {uploadedFiles[doc]
                      ? uploadedFiles[doc]
                      : "Upload document"}
                  </span>
                  <label className="cursor-pointer">
                    <FaUpload
                      className={`${
                        uploadedFiles[doc] ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, doc)}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              className={`px-6 py-3 rounded-lg flex items-center transition-all duration-200 ${
                isComplete
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleProceedToPayment}
              disabled={!isComplete}
            >
              {isComplete
                ? "Proceed to Payment"
                : "Upload All Documents to Continue"}
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 1.2s linear;
        }
      `}</style>
    </div>
  );
};

export default UploadDocuments;
