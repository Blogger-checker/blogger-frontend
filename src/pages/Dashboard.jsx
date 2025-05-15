import { faCheckCircle, faClock, faFileAlt, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { faBan } from '@fortawesome/free-solid-svg-icons';

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
    const [stats, setStats] = useState({
        total: 0,
        published: 0,
        pending: 0,
        rejected: 0
    });
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Add timeout to prevent infinite loading
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 15000); // Increased timeout
                
                // Log the API URL being called
                console.log('Fetching from:', `${API_URL}/all`);
                
                // Fetch all blogs with error details
                const response = await axios.get(`${API_URL}/all`, {
                    signal: controller.signal,
                    validateStatus: null, // Allow all status codes
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                
                clearTimeout(timeoutId);

                // Log the full response for debugging
                console.log('Server response:', response);

                // Check response status
                if (response.status !== 200) {
                    throw new Error(`Server responded with status ${response.status}: ${
                        response.data?.message || 
                        response.data?.error || 
                        response.statusText || 
                        'Unknown error'
                    }`);
                }

                const blogs = response.data;
                
                // Validate response data
                if (!blogs || !Array.isArray(blogs)) {
                    console.error('Invalid response format:', blogs);
                    throw new Error('Invalid data format received from server');
                }
                
                // Calculate statistics
                const total = blogs.length;
                const published = blogs.filter(blog => blog.status === 'published').length;
                const pending = blogs.filter(blog => blog.status === 'pending').length;
                const rejected = blogs.filter(blog => blog.status === 'rejected').length;
                
                setStats({ total, published, pending, rejected });
                setSubmissions(blogs);
            } catch (err) {
                console.error('Detailed error:', err);
                console.error('Error response:', err.response?.data);
                
                let errorMessage = 'Failed to load dashboard data. ';
                
                if (err.code === 'ECONNREFUSED') {
                    errorMessage += 'Cannot connect to server. Please check if the server is running.';
                } else if (err.name === 'AbortError') {
                    errorMessage += 'Request timed out. Please check your connection.';
                } else if (err.response?.status === 500) {
                    errorMessage += `Server error: ${err.response.data?.message || 'Internal server error'}`;
                } else {
                    errorMessage += err.message || 'Please try again later.';
                }
                
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'published':
                return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
            case 'pending':
                return <FontAwesomeIcon icon={faClock} className="text-warning" />;
            case 'rejected':
                return <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />;
            default:
                return null;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'published':
                return <span className="badge bg-success me-2">Published</span>;
            case 'pending':
                return <span className="badge bg-warning text-dark me-2">Under Review</span>;
            case 'rejected':
                return <span className="badge bg-danger me-2">Rejected</span>;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

  return (
    <div className="bg-light min-vh-100">
      {/* Main Content */}
      <div className="container py-4">
        {/* Dashboard Header */}
        <div className="card mb-4 dash-bg-img bg-opacity-10 border-0">
          <div className="card-body p-4">
            <div className="row">
              <div className="col-md-8">
                <h2 className="fw-bold mb-2">My Blog Dashboard</h2>
                <p className="text-muted">Track your submissions and view their status</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h6 className="text-primary">Total Submissions</h6>
                <h1 className="display-4 fw-bold">{stats.total}</h1>
              </div>
              <div className="card-footer bg-light border-0 text-end">
                <FontAwesomeIcon icon={faFileAlt} className="text-primary opacity-50" size="lg" />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h6 className="text-success">Published Blogs</h6>
                <h1 className="display-4 fw-bold">{stats.published}</h1>
              </div>
              <div className="card-footer bg-light border-0 text-end">
                <FontAwesomeIcon icon={faCheckCircle} className="text-success opacity-50" size="lg" />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h6 className="text-danger">Rejected Blogs</h6>
                <h1 className="display-4 fw-bold">{stats.rejected}</h1>
              </div>
              <div className="card-footer bg-light border-0 text-end">
                <FontAwesomeIcon icon={faBan} className="text-danger opacity-50" size="lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Recent Submissions */}
          <div className="col-lg-7 mb-4">
            <h5 className="fw-bold mb-3">Recent Submissions</h5>
            
            {submissions.map((submission) => (
                <div key={submission._id} className="card mb-3 border-0 shadow-sm">
                    <div className="card-body position-relative">
                        <div className="position-absolute end-0 top-0 mt-3 me-3">
                            {getStatusIcon(submission.status)}
                        </div>
                        <h5 className="mb-1">{submission.title}</h5>
                        <p className="text-muted small mb-3">
                            Category: {submission.category} • Submitted: {submission.createdAt ? new Date(submission.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                        
                        <div className={`alert alert-${submission.status === 'published' ? 'success' : submission.status === 'pending' ? 'warning' : 'danger'} bg-${submission.status === 'published' ? 'success' : submission.status === 'pending' ? 'warning' : 'danger'} bg-opacity-10 border-${submission.status === 'published' ? 'success' : submission.status === 'pending' ? 'warning' : 'danger'} border-opacity-25`}>
                            <div className="d-flex align-items-center mb-2">
                                {getStatusBadge(submission.status)}
                                <span>
                                    {submission.status === 'published' 
                                        ? 'Your blog has been approved and published! We\'ve sent you an email with the link.'
                                        : submission.status === 'pending'
                                            ? 'Your blog is currently being reviewed for word count and originality.'
                                            : 'Your blog was rejected Because of plagiarism or other issues. Please check your email for details.'}
                                </span>
                            </div>
                            {submission.status === 'published' && (
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                                    <span>Your blog is live! View it at <a href={submission.publicUrl} className="text-decoration-none">{submission.publicUrl}</a></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
          </div>
          
          {/* Stats & Tips */}
          <div className="col-lg-5">
            <h5 className="fw-bold mb-3">Submission Statistics</h5>
            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body d-flex justify-content-center">
                <div style={{ width: '200px', height: '200px' }}>
                  <svg viewBox="0 0 100 100" className="w-100 h-100">
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#ffc107" strokeWidth="20" strokeDasharray={`${(stats.pending / stats.total) * 220 || 0} 220`}></circle>
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#dc3545" strokeWidth="20" strokeDasharray={`${(stats.rejected / stats.total) * 220 || 0} 220`} strokeDashoffset={`-${(stats.pending / stats.total) * 220 || 0}`}></circle>
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#28a745" strokeWidth="20" strokeDasharray={`${(stats.published / stats.total) * 220 || 0} 220`} strokeDashoffset={`-${((stats.pending + stats.rejected) / stats.total) * 220 || 0}`}></circle>
                    <circle cx="50" cy="50" r="25" fill="white"></circle>
                  </svg>
                </div>
              </div>
              <div className="card-footer bg-white border-0">
                <div className="d-flex justify-content-center">
                  <div className="d-flex align-items-center me-3">
                    <div className="bg-success rounded-circle me-1" style={{ width: '12px', height: '12px' }}></div>
                    <small>Published</small>
                  </div>
                  <div className="d-flex align-items-center me-3">
                    <div className="bg-warning rounded-circle me-1" style={{ width: '12px', height: '12px' }}></div>
                    <small>Under Review</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="bg-danger rounded-circle me-1" style={{ width: '12px', height: '12px' }}></div>
                    <small>Rejected</small>
                  </div>
                </div>
              </div>
            </div>
            
            <h5 className="fw-bold mb-3">Quick Tips</h5>
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <div className="d-flex">
                      <div className="me-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                      </div>
                      <div>Ensure your content is at least 800 words long</div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="d-flex">
                      <div className="me-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                      </div>
                      <div>Use proper formatting with headings and paragraphs</div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="d-flex">
                      <div className="me-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                      </div>
                      <div>Include relevant images or diagrams when appropriate</div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="d-flex">
                      <div className="me-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                      </div>
                      <div>Cite sources properly to avoid plagiarism flags</div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex">
                      <div className="me-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                      </div>
                      <div>Proofread thoroughly before submission</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
