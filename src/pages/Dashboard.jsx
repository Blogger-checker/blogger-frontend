import { faCheckCircle, faClock, faFileAlt, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Dashboard() {
    
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
                <h1 className="display-4 fw-bold">3</h1>
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
                <h1 className="display-4 fw-bold">1</h1>
              </div>
              <div className="card-footer bg-light border-0 text-end">
                <FontAwesomeIcon icon={faCheckCircle} className="text-success opacity-50" size="lg" />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h6 className="text-warning">Pending Review</h6>
                <h1 className="display-4 fw-bold">1</h1>
              </div>
              <div className="card-footer bg-light border-0 text-end">
                <FontAwesomeIcon icon={faClock} className="text-warning opacity-50" size="lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Recent Submissions */}
          <div className="col-lg-7 mb-4">
            <h5 className="fw-bold mb-3">Recent Submissions</h5>
            
            {/* Submission 1 */}
            <div className="card mb-3 border-0 shadow-sm">
              <div className="card-body position-relative">
                <div className="position-absolute end-0 top-0 mt-3 me-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                </div>
                <h5 className="mb-1">The Future of AI in Healthcare</h5>
                <p className="text-muted small mb-3">Category: Technology • Submitted: 2025-05-08</p>
                
                <div className="alert alert-success bg-success bg-opacity-10 border-success border-opacity-25">
                  <div className="d-flex align-items-center mb-2">
                    <span className="badge bg-success me-2">Published</span>
                    <span>Your blog has been approved and published! We've sent you an email with the link.</span>
                    <div className="ms-auto">
                      <a href="#" className="text-decoration-none">View Details</a>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                    <span>Your blog is live! View it at <a href="blogcheck.com/p/1" className="text-decoration-none">blogcheck.com/p/1</a></span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Submission 2 */}
            <div className="card mb-3 border-0 shadow-sm">
              <div className="card-body position-relative">
                <div className="position-absolute end-0 top-0 mt-3 me-3">
                  <FontAwesomeIcon icon={faClock} className="text-warning" />
                </div>
                <h5 className="mb-1">Sustainable Living in Urban Areas</h5>
                <p className="text-muted small mb-3">Category: Environment • Submitted: 2025-05-05</p>
                
                <div className="alert alert-warning bg-warning bg-opacity-10 border-warning border-opacity-25">
                  <div className="d-flex align-items-center">
                    <span className="badge bg-warning text-dark me-2">Under Review</span>
                    <span>Your blog is currently being reviewed for word count and originality.</span>
                    <div className="ms-auto">
                      <a href="#" className="text-decoration-none">View Details</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Submission 3 */}
            <div className="card mb-3 border-0 shadow-sm">
              <div className="card-body position-relative">
                <div className="position-absolute end-0 top-0 mt-3 me-3">
                  <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />
                </div>
                <h5 className="mb-1">Financial Planning for Millennials</h5>
                <p className="text-muted small mb-3">Category: Finance • Submitted: 2025-05-01</p>
                
                <div className="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-25">
                  <div className="d-flex align-items-center">
                    <span className="badge bg-danger me-2">Rejected</span>
                    <span>Your blog was rejected because it has fewer than 800 words. Please revise and resubmit.</span>
                    <div className="ms-auto">
                      <a href="#" className="text-decoration-none">View Details</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats & Tips */}
          <div className="col-lg-5">
            <h5 className="fw-bold mb-3">Submission Statistics</h5>
            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body d-flex justify-content-center">
                <div style={{ width: '200px', height: '200px' }}>
                  {/* This would be a donut chart in a real implementation */}
                  <svg viewBox="0 0 100 100" className="w-100 h-100">
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#ffc107" strokeWidth="20" strokeDasharray="73 110"></circle>
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#dc3545" strokeWidth="20" strokeDasharray="73 110" strokeDashoffset="-73"></circle>
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#28a745" strokeWidth="20" strokeDasharray="73 110" strokeDashoffset="-146"></circle>
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
