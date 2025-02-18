import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import { useProgress } from "./ProgressContext";
import { CheckCircle } from "lucide-react";
import { sendQycDocs } from "../../helper/insurances";

const UploadDocuments = () => {
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [kycDocs, setKycDocs] = useState([]);
  const [errors, setErrors] = useState({}); // Track missing files
  const {
    uploadedDocuments,
    setUploadedDocuments,
    setProgress,
    uploadedFiles,
    progress,
    setUploadedFiles,
  } = useProgress();
  // console.log(kycDocs);

  // Required documents
  const requiredDocuments = [
    { key: "national_id", label: "National ID/Passport" },
    { key: "kra_pin_certificate", label: "KRA PIN Certificate" },
    { key: "driving_license", label: "Driving License" },
    { key: "log_book", label: "Logbook" },
    {
      key: "valuation_report",
      label: "Valuation Report (for comprehensive cover)",
    },
  ];

  useEffect(() => {
    // Check if all documents are uploaded
    if (progress === 100) {
      setIsComplete(true);
    }
  }, [progress]);

  const handleFileUpload = (event, docType) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file); // Generate file preview URL

      setKycDocs((prevDocs) => ({
        ...prevDocs,
        [docType]: file,
      }));

      setUploadedFiles((prevFiles) => ({
        ...prevFiles,
        [docType]: file.name, // Store the file name
      }));

      if (!uploadedDocuments.includes(docType)) {
        const updatedDocuments = [...uploadedDocuments, docType];
        setUploadedDocuments(updatedDocuments);

        const totalDocuments = requiredDocuments.length;
        const newProgress = Math.round(
          (updatedDocuments.length / totalDocuments) * 100
        );
        setProgress(newProgress);
      }

      // Remove validation error when file is uploaded
      setErrors((prevErrors) => ({
        ...prevErrors,
        [docType]: false,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    let validationErrors = {};
    let isValid = true;

    // Check if all required documents are uploaded
    requiredDocuments.forEach((doc) => {
      if (!uploadedFiles[doc.key]) {
        validationErrors[doc.key] = true;
        isValid = false;
      }
    });

    setErrors(validationErrors);

    if (isValid) {
      sendQycDocs(kycDocs, navigate,setShowSuccess); // Send documents to the server
      setShowSuccess(true); // Show success message
      setTimeout(() => {
      }, 10000); // Redirect after 2 seconds
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
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
        <form onSubmit={handleSubmit}>
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
                <label className="block font-medium mb-2">{doc.label}</label>
                <div
                  className={`flex justify-between items-center border p-3 rounded-md cursor-pointer
                    ${
                      uploadedFiles[doc.key]
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50"
                    }`}
                >
                  <span
                    className={`${
                      uploadedFiles[doc.key] ? "text-blue-700" : "text-gray-500"
                    }`}
                  >
                    {uploadedFiles[doc.key]
                      ? uploadedFiles[doc.key]
                      : "Upload document"}
                  </span>
                  <label className="cursor-pointer">
                    <FaUpload
                      className={`${
                        uploadedFiles[doc.key]
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    />
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, doc.key)}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>
                {errors[doc.key] && (
                  <p className="text-red-500 text-sm mt-1">
                    {doc.label} is required.
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className={`px-6 py-3 rounded-lg flex items-center transition-all duration-200 ${
                isComplete
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isComplete}
            >
              {isComplete
                ? "Proceed to Payment"
                : "Upload All Documents to Continue"}
            </button>
          </div>
        </form>
      )}

      <style>{`
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
