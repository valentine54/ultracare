import React, { useState, useEffect } from "react";

const GOOGLE_SHEET_CSV_URL =import.meta.env.VITE_GOOGLE_SHEET_CSV_URL;

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  
  const dateParts = dateString.split("/");
  if (dateParts.length !== 3) return dateString;
  
  const [month, day, year] = dateParts.map((part) => parseInt(part, 10));
  
  const getOrdinalSuffix = (num) => {
    if (num > 3 && num < 21) return "th"; // Handles 11th, 12th, 13th
    switch (num % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <>
      {day}
      <sup className="text-xs">{getOrdinalSuffix(day)}</sup>{" "}
      {new Date(year, month - 1, day).toLocaleString("default", {
        month: "long",
      })}{" "}
      {year}
    </>
  );
};

// More robust function to extract file ID from various Google Drive URL formats
const extractFileIdFromUrl = (url) => {
  if (!url) return "";
  
  // Handle multiple possible Google Drive URL patterns
  const patterns = [
    /\/d\/([^/]+)/,           // https://drive.google.com/file/d/FILE_ID/
    /id=([^&]+)/,             // https://drive.google.com/open?id=FILE_ID
    /\/open\?id=([^&]+)/,     // Another open?id= format
    /\/file\/d\/([^\/]+)/     // Another file/d/ format
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return "";
};

const CareersPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(GOOGLE_SHEET_CSV_URL)
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split("\n").slice(1); // Skip headers
        const formattedJobs = rows
          .map((row) => {
            const columns = row.split(",");

            const originalLink = columns[3]?.trim(); // "Upload Job Description (PDF)"
            const fileId = extractFileIdFromUrl(originalLink);

            // Use download link instead of view link
            const driveDownloadLink = fileId
              ? `https://drive.google.com/uc?export=download&id=${fileId}`
              : originalLink;

            return {
              title: columns[1]?.trim(),
              closingDate: columns[2]?.trim(),
              pdfLink: driveDownloadLink, // Updated to use download link
              fileId: fileId
            };
          })
          .filter((job) => job.title && job.closingDate && job.pdfLink);

        setJobs(formattedJobs);
      })
      .catch((error) => console.error("Error fetching job data:", error));
  }, []);

  // Function to handle file download with multiple methods
  const handleDownload = (job) => {
    if (!job.pdfLink) {
      console.error("No download link available.");
      return;
    }
    
    // Method 1: Direct link with download attribute
    const a = document.createElement("a");
    a.href = job.pdfLink;
    a.download = `${job.title.replace(/\s+/g, '-')}-Job-Description.pdf`;
    a.target = "_blank"; // Fallback to open in new tab if download fails
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Method 2: Invisible iframe to force download
    if (job.fileId) {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = `https://drive.google.com/uc?export=download&id=${job.fileId}`;
      document.body.appendChild(iframe);
      
      // Remove the iframe after a delay
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 5000);
    }
  };

  return (
    <div className="max-w-5xl pt-40 mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Vacancies</h1>
      <p className="text-gray-700 mb-4">
        At Bosongo Hospital, our most valuable resource is our employees.
        We aim to provide the best client experience by having the right
        employees on the right jobs.
      </p>
      
      <div className="bg-gray-40 p-4 rounded-md shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Stay Alert: Avoid Job Scams</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Requires you to pay a fee to be shortlisted or interviewed.</li>
          <li>Requires you to pay fees for a certain recruitment process.</li>
          <li>
            Requires you to sign contracts sent through unofficial emails before
            meeting HR at the Hospital's HR Office.
          </li>
          <li>Is not from our official email domains.</li>
          <li>Informs you that you have been selected without an interview.</li>
          <li>
            Is from other websites announcing job vacancies that do not appear
            on our official careers page.
          </li>
        </ul>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white uppercase">
              <th className="p-3">JOB VACANCY</th>
              <th className="p-3">CLOSING DATE</th>
              <th className="p-3">DOWNLOAD</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-3">{job.title}</td>
                  <td className="p-3">{formatDate(job.closingDate)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDownload(job)}
                      className="bg-white text-blue-900 px-4 py-2 rounded-lg border border-blue-900 hover:bg-blue-900 hover:text-white transition"
                    >
                      Download Job Description
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-3 text-center">
                  No job vacancies available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CareersPage;