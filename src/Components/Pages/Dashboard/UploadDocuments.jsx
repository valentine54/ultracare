import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useProgress } from "./ProgressContext";

import { sendQycDocs } from "../../helper/insurances";

const UploadDocuments = () => {
  const {
    uploadedDocuments,
    setUploadedDocuments,
    setProgress,
    uploadedFiles,
    setUploadedFiles,
  } = useProgress();
  const [kycDocs, setKycDocs] = useState({});
  const [errors, setErrors] = useState({}); // Track missing files

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

        const totalDocuments = 5;
        const newProgress = (updatedDocuments.length / totalDocuments) * 100;
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
    Docsneeded.forEach((doc) => {
      if (!uploadedFiles[doc.key]) {
        validationErrors[doc.key] = true;
        isValid = false;
      }
    });

    setErrors(validationErrors);

    if (isValid) {
      sendQycDocs(kycDocs, navigate, setLoading); // Send documents to the server
      console.log("Submitting documents:", kycDocs);
    }
  };
  
  const Docsneeded = [
    { key: "national_id", label: "National ID/Passport" },
    { key: "kra_pin", label: "KRA PIN Certificate" },
    { key: "driving_license", label: "Driving License" },
    { key: "logbook", label: "Logbook" },
    {
      key: "valuation_report",
      label: "Valuation Report (for comprehensive cover)",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Upload Documents Section */}
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-auto">
          <h2 className="text-xl font-bold mb-4">
            Car Insurance Quote In Progress
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Docsneeded.map((doc) => (
              <div key={doc.key} className="p-4 bg-white rounded shadow">
                <label className="block font-medium mb-2">{doc.label}</label>
                <div
                  className={`flex justify-between items-center border p-2 rounded-md bg-gray-50 cursor-pointer ${
                    errors[doc.key] ? "border-red-500" : ""
                  }`}
                >
                  <span className="text-gray-500">
                    {uploadedFiles[doc.key] || "Upload document"}
                  </span>
                  <label className="cursor-pointer">
                    <FaUpload className="text-blue-600" />
                    <input
                      type="file"
                      className="hidden"
                      name={doc.key}
                      onChange={(e) => handleFileUpload(e, doc.key)}
                      accept="image/*,application/pdf"
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

          <div className="mt-6 flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Upload docs
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDocuments;
