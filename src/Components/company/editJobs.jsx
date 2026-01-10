import React, { useState, useEffect } from "react";

const PostJob = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [deleteTimeout, setDeleteTimeout] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    closing_date: '',
    pdf_file: null,
    existing_pdf: null,
    existing_pdf_name: ''
  });

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/jobs/");
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setError('Failed to load jobs. Please try again.');
    }
  };

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
      const closingDate = new Date(formData.get('closing_date'));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (closingDate <= today) {
        throw new Error('Please select a future date for the application deadline');
      }
      
      if (!e.target.pdf_file.files[0]) {
        throw new Error('Please select a PDF file');
      }

      const response = await fetch("http://localhost:8000/api/jobs/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post job');
      }

      setIsSubmitted(true);
      e.target.reset();
      await fetchJobs();
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job.id);
    // Extract filename from the PDF URL
    const pdfUrl = job.pdf_file.startsWith('http') ? job.pdf_file : `http://localhost:8000${job.pdf_file}`;
    const fileName = job.pdf_file.split('/').pop();
    
    setEditFormData({
      title: job.title,
      closing_date: job.closing_date,
      pdf_file: null,
      existing_pdf: pdfUrl,
      existing_pdf_name: fileName
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditFileChange = (e) => {
    setEditFormData(prev => ({
      ...prev,
      pdf_file: e.target.files[0]
    }));
  };

  const handleUpdate = async (jobId) => {
    try {
      setIsLoading(true);
      setError(null);
  
      // Validate the form data
      if (!editFormData.title || !editFormData.closing_date) {
        throw new Error('Please fill in all required fields');
      }
  
      // Format date properly
      const formattedDate = new Date(editFormData.closing_date).toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      
      if (formattedDate <= today) {
        throw new Error('Please select a future date for the application deadline');
      }
  
      const formData = new FormData();
      formData.append('title', editFormData.title);
      formData.append('closing_date', formattedDate);
      
      if (editFormData.pdf_file) {
        formData.append('pdf_file', editFormData.pdf_file);
      } else {
        formData.append('keep_existing_pdf', 'true');
      }
  
      const response = await fetch(`http://localhost:8000/api/jobs/${jobId}/`, {
        method: 'PATCH', // Try PATCH if PUT doesn't work
        body: formData,
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error('Backend validation errors:', responseData);
        throw new Error(responseData.detail || 
                      Object.values(responseData).join(', ') || 
                      'Failed to update job');
      }
  
      setEditingJob(null);
      await fetchJobs();
    } catch (error) {
      console.error('Update error:', {
        error: error.toString(),
        stack: error.stack,
      });
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleDelete = async (jobId) => {
    // First click - set confirmation
    if (jobToDelete !== jobId) {
      // Clear any existing timeout
      if (deleteTimeout) {
        clearTimeout(deleteTimeout);
      }
      
      setJobToDelete(jobId);
      
      // Set a timeout to automatically cancel the deletion if no action is taken
      const timeout = setTimeout(() => {
        setJobToDelete(null);
      }, 5000); // 5 seconds to confirm
      
      setDeleteTimeout(timeout);
      return;
    }
    
    // Second click - confirm deletion
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8000/api/jobs/${jobId}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      await fetchJobs();
      setJobToDelete(null);
    } catch (error) {
      console.error('Error deleting job:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
      if (deleteTimeout) {
        clearTimeout(deleteTimeout);
      }
    }
  };

  const cancelEdit = () => {
    setEditingJob(null);
    setEditFormData({
      title: '',
      closing_date: '',
      pdf_file: null,
      existing_pdf: null,
      existing_pdf_name: ''
    });
  };

  return (
    <div style={{ 
      padding: "2rem",
      paddingTop: "10rem",
      maxWidth: "1000px", 
      margin: "auto",
      minHeight: "100vh"
    }}>
      <div style={{
        maxWidth: "1000px",
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
          Manage Job Opportunities (Edit/Delete)
        </h2>

        {/* Your existing form here */}

        {jobs.length > 0 && (
          <div style={{ marginTop: "3rem" }}>
            <h3 style={{ 
              marginBottom: "1rem", 
              color: "#2c3e50", 
              fontSize: "1.5rem",
              paddingBottom: "0.5rem",
              borderBottom: "2px solid #eee"
            }}>
              Current Job Listings
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ 
                width: "100%", 
                borderCollapse: "collapse",
                marginTop: "1rem"
              }}>
                <thead>
                  <tr style={{ 
                    backgroundColor: "#3498db",
                    color: "white",
                    textAlign: "left" 
                  }}>
                    <th style={{ padding: "0.75rem", border: "1px solid #2980b9" }}>Title</th>
                    <th style={{ padding: "0.75rem", border: "1px solid #2980b9" }}>Deadline</th>
                    <th style={{ padding: "0.75rem", border: "1px solid #2980b9" }}>PDF</th>
                    <th style={{ padding: "0.75rem", border: "1px solid #2980b9" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id} style={{ 
                      borderBottom: "1px solid #eee",
                      '&:hover': { backgroundColor: "#f5f5f5" }
                    }}>
                      {editingJob === job.id ? (
                        <>
                          <td style={{ padding: "0.75rem" }}>
                            <input
                              type="text"
                              name="title"
                              value={editFormData.title}
                              onChange={handleEditChange}
                              style={{
                                width: "100%",
                                padding: "0.5rem",
                                border: "1px solid #ddd",
                                borderRadius: "4px"
                              }}
                            />
                          </td>
                          <td style={{ padding: "0.75rem" }}>
                            <input
                              type="date"
                              name="closing_date"
                              value={editFormData.closing_date}
                              onChange={handleEditChange}
                              min={getTomorrowDate()}
                              style={{
                                width: "100%",
                                padding: "0.5rem",
                                border: "1px solid #ddd",
                                borderRadius: "4px"
                              }}
                            />
                          </td>
                          <td style={{ padding: "0.75rem" }}>
                            {editFormData.existing_pdf && (
                              <div style={{ 
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "0.5rem"
                              }}>
                                <span style={{ marginRight: "0.5rem" }}>Current:</span>
                                <div style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  padding: "0.25rem 0.5rem",
                                  backgroundColor: "#f0f0f0",
                                  borderRadius: "4px"
                                }}>
                                  <span style={{ marginRight: "0.5rem" }}>
                                    {editFormData.existing_pdf_name}
                                  </span>
                                  <a 
                                    href={editFormData.existing_pdf} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{
                                      color: "#3498db",
                                      textDecoration: "none",
                                      display: "inline-flex",
                                      alignItems: "center"
                                    }}
                                  >
                                    <svg 
                                      width="16" 
                                      height="16" 
                                      viewBox="0 0 24 24" 
                                      fill="none" 
                                      stroke="#3498db" 
                                      strokeWidth="2" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round"
                                      style={{ marginRight: "0.25rem" }}
                                    >
                                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                      <polyline points="17 8 12 3 7 8"></polyline>
                                      <line x1="12" y1="3" x2="12" y2="15"></line>
                                    </svg>
                                    View
                                  </a>
                                </div>
                              </div>
                            )}
                            <div style={{
                              border: "1px dashed #ddd",
                              padding: "0.5rem",
                              borderRadius: "4px",
                              backgroundColor: "#f9f9f9"
                            }}>
                              <label style={{ display: "block", marginBottom: "0.25rem" }}>
                                Change PDF:
                              </label>
                              <input
                                type="file"
                                name="pdf_file"
                                onChange={handleEditFileChange}
                                accept=".pdf"
                                style={{
                                  width: "100%",
                                  padding: "0.25rem"
                                }}
                              />
                              {editFormData.pdf_file && (
                                <div style={{
                                  marginTop: "0.25rem",
                                  fontSize: "0.85rem",
                                  color: "#666"
                                }}>
                                  New file: {editFormData.pdf_file.name}
                                </div>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: "0.75rem" }}>
                            <button
                              onClick={() => handleUpdate(job.id)}
                              disabled={isLoading}
                              style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#27ae60",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                marginRight: "0.5rem",
                                cursor: "pointer",
                                opacity: isLoading ? 0.7 : 1
                              }}
                            >
                              {isLoading ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              onClick={cancelEdit}
                              disabled={isLoading}
                              style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#e74c3c",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                opacity: isLoading ? 0.7 : 1
                              }}
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td style={{ padding: "0.75rem" }}>{job.title}</td>
                          <td style={{ padding: "0.75rem" }}>{job.closing_date}</td>
                          <td style={{ padding: "0.75rem" }}>
                            <a 
                              href={job.pdf_file.startsWith('http') ? job.pdf_file : `http://localhost:8000${job.pdf_file}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={{ 
                                color: "#3498db",
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center"
                              }}
                            >
                              <svg 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="#3498db" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                style={{ marginRight: "0.25rem" }}
                              >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                              </svg>
                              {job.pdf_file.split('/').pop()}
                            </a>
                          </td>
                          <td style={{ padding: "0.75rem" }}>
                            <button
                              onClick={() => handleEdit(job)}
                              style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#3498db",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                marginRight: "0.5rem",
                                cursor: "pointer"
                              }}
                            >
                              Edit
                            </button>
                            {
    jobToDelete === job.id ? (
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => handleDelete(job.id)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Confirm Delete
        </button>
        <button
          onClick={() => setJobToDelete(null)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
      </div>
    ) : (
      <button
        onClick={() => handleDelete(job.id)}
        disabled={isLoading}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#f39c12",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          opacity: isLoading ? 0.7 : 1
        }}
      >
        Delete
      </button>
    )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default PostJob;