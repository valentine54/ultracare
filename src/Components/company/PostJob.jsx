import React, { useState, useEffect } from "react";


const PostJob = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/jobs/");
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  };
  
  // Call it once on component mount
  useEffect(() => {
    fetchJobs();
  }, []);



  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSubmitted(false);

    try {
      const formData = new FormData(e.target);

      // Check if date is valid (not today or past)
    const closingDate = new Date(formData.get('closing_date'));
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only
    
    if (closingDate <= today) {
      throw new Error('Please select a future date for the application deadline');
    }
      
      if (!e.target.pdf_file.files[0]) {
        throw new Error('Please select a PDF file');
      }

      const response = await fetch("http://localhost:8000/api/jobs/", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      // First log the raw response text
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      // Then try to parse as JSON
      const result = JSON.parse(responseText);
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to post job');
      }

      setIsSubmitted(true);
      e.target.reset();

      await fetchJobs();  // Refresh the job list
      
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: "2rem",
      paddingTop: "10rem",
      maxWidth: "600px", 
      margin: "auto",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}>
      <div style={{
        maxWidth: "600px",
        width: "100%",
        padding: "2rem",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <h2 style={{
          textAlign: "center",
          color: "#2c3e50",
          marginBottom: "1.5rem",
          fontSize: "1.75rem",
          fontWeight: "600"
        }}>
          Post a New Job Opportunity
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div style={{ marginBottom: "1.75rem" }}>
            <label htmlFor="title" style={{ 
              display: "block", 
              marginBottom: "0.75rem", 
              fontWeight: "500", 
              color: "#2c3e50",
              fontSize: "1.05rem"
            }}>
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g. Resident Doctor"
              required
              style={{
                width: "100%",
                padding: "0.875rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3498db";
                e.target.style.boxShadow = "0 0 0 3px rgba(52, 152, 219, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ddd";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          
          <div style={{ marginBottom: "1.75rem" }}>
            <label htmlFor="closing_date" style={{ 
              display: "block", 
              marginBottom: "0.75rem", 
              fontWeight: "500", 
              color: "#2c3e50",
              fontSize: "1.05rem"
            }}>
              Application Deadline
            </label>
            <input
              type="date"
              id="closing_date"
              name="closing_date"
              required
              min={getTomorrowDate()}
              style={{
                width: "100%",
                padding: "0.875rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
                color: "#555",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3498db";
                e.target.style.boxShadow = "0 0 0 3px rgba(52, 152, 219, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ddd";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          
          <div style={{ marginBottom: "2rem" }}>
            <label htmlFor="pdf_file" style={{ 
              display: "block", 
              marginBottom: "0.75rem", 
              fontWeight: "500", 
              color: "#2c3e50",
              fontSize: "1.05rem"
            }}>
              Job Description PDF
            </label>
            <div style={{
              border: "2px dashed #ddd",
              borderRadius: "8px",
              padding: "1.75rem",
              textAlign: "center",
              transition: "all 0.3s ease",
              backgroundColor: "#f8f9fa",
              position: "relative",
              minHeight: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }} id="file-upload-area">
              <input
                type="file"
                id="pdf_file"
                name="pdf_file"
                accept=".pdf"
                required
                style={{ 
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  opacity: 0,
                  cursor: "pointer"
                }}
                onChange={(e) => {
                  if(e.target.files.length > 0) {
                    const uploadArea = document.getElementById('file-upload-area');
                    uploadArea.style.borderColor = "#3498db";
                    uploadArea.style.backgroundColor = "#e8f4fd";
                    document.getElementById('file-name').textContent = e.target.files[0].name;
                  }
                }}
              />
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <div>
                  <span style={{ color: "#3498db", fontWeight: "500", fontSize: "1.05rem" }}>Click to upload PDF</span>
                  <span style={{ display: "block", fontSize: "0.9rem", color: "#7f8c8d", marginTop: "0.25rem" }}>or drag and drop</span>
                </div>
                <span id="file-name" style={{ 
                  fontSize: "0.9rem", 
                  color: "#2c3e50", 
                  marginTop: "0.75rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#ecf0f1",
                  borderRadius: "20px"
                }}>
                  No file selected
                </span>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "1rem",
              backgroundColor: isLoading ? "#95a5a6" : "#3498db",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.05rem",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"
            }}
            onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = "#2980b9")}
            onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = "#3498db")}
            onMouseDown={(e) => !isLoading && (e.target.style.transform = "scale(0.98)")}
            onMouseUp={(e) => !isLoading && (e.target.style.transform = "scale(1)")}
          >
            {isLoading ? "Posting..." : "Post Job"}
          </button>

          {error && (
            <div style={{
              marginTop: "1.5rem",
              padding: "1rem",
              backgroundColor: "#f8d7da",
              color: "#721c24",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "1rem",
              border: "1px solid #f5c6cb"
            }}>
              {error}
            </div>
          )}

          {isSubmitted && (
            <div style={{
              marginTop: "1.5rem",
              padding: "1rem",
              backgroundColor: "#d4edda",
              color: "#155724",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "1rem",
              border: "1px solid #c3e6cb"
            }}>
              Job posted successfully!
            </div>
          )}
        </form>
        {jobs.length > 0 && (
  <div style={{ marginTop: "3rem" }}>
    <h3 style={{ marginBottom: "1rem", color: "#2c3e50", fontSize: "1.5rem" }}>Posted Jobs</h3>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ backgroundColor: "#ecf0f1", textAlign: "left" }}>
          <th style={{ padding: "0.75rem", border: "1px solid #ccc" }}>Title</th>
          <th style={{ padding: "0.75rem", border: "1px solid #ccc" }}>Deadline</th>
          <th style={{ padding: "0.75rem", border: "1px solid #ccc" }}>PDF</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id}>
            <td style={{ padding: "0.75rem", border: "1px solid #eee" }}>{job.title}</td>
            <td style={{ padding: "0.75rem", border: "1px solid #eee" }}>{job.closing_date}</td>
            <td style={{ padding: "0.75rem", border: "1px solid #eee" }}>
              <a href={job.pdf_file} target="_blank" rel="noopener noreferrer" style={{ color: "#3498db" }}>
                View PDF
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      </div>
      
    </div>
  );
};

export default PostJob;