import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faClock, faEnvelope, faFileWord, faUser } from '@fortawesome/free-regular-svg-icons';
import { faAlignLeft, faChevronDown, faInfoCircle, faUpload } from '@fortawesome/free-solid-svg-icons';

export default function Submitform() {
    const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(true);

    const toggleGuidelines = () => {
        setIsGuidelinesOpen(!isGuidelinesOpen);
    };

  return (
    <div className="bg-light min-vh-100">
      {/* Main Content */}
      <div className="container py-4 bg-light">
        {/* Dashboard Header */}
        <div className="card card-bg-img bg-opacity-10 border-0">
          <div className="card-body p-4">
            <div className="row">
              <div className="col-md-8">
                <h2 className="fw-bold mb-2">Submit Your Blog</h2>
                <p className="text-muted">Share your expertise with our community. We accept original content with a 
                minimum of 800 words.</p>
              </div>
            </div>
          </div>
        </div>

        <div className='from-conatiner p-5 bg-white'>
            {/* Progress Steps */}
            <div className="d-flex mb-4 position-relative">
            <div style={{ width: '100%', height: '2px', backgroundColor: '#e9ecef', position: 'absolute', top: '25px', zIndex: 1 }}></div>
            
            <div className="d-flex justify-content-between w-100" style={{ zIndex: 2 }}>
                <div className="d-flex flex-column align-items-center">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-2" 
                    style={{ width: '32px', height: '32px', fontSize: '0.875rem' }}>
                    1
                </div>
                <div className="d-flex flex-column align-items-center">
                    <span className="fw-bold" style={{ fontSize: '0.9rem' }}>Submit</span>
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>Upload your blog</span>
                </div>
                </div>

                <div className="d-flex flex-column align-items-center">
                <div className="rounded-circle bg-light text-muted d-flex align-items-center justify-content-center mb-2" 
                    style={{ width: '32px', height: '32px', fontSize: '0.875rem', border: '1px solid #dee2e6' }}>
                    2
                </div>
                <div className="d-flex flex-column align-items-center">
                    <span className="fw-bold" style={{ fontSize: '0.9rem' }}>Review</span>
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>We check content</span>
                </div>
                </div>

                <div className="d-flex flex-column align-items-center">
                <div className="rounded-circle bg-light text-muted d-flex align-items-center justify-content-center mb-2" 
                    style={{ width: '32px', height: '32px', fontSize: '0.875rem', border: '1px solid #dee2e6' }}>
                    3
                </div>
                <div className="d-flex flex-column align-items-center">
                    <span className="fw-bold" style={{ fontSize: '0.9rem' }}>Publish</span>
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>If approved</span>
                </div>
                </div>
            </div>
            </div>

            <div className="container">
                {/* Form */}
                <form className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">
                        <span className="text-danger">*</span> Full Name
                        </label>
                        <div className="input-group">
                        <span className="input-group-text bg-white text-muted">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            placeholder="Enter your full name"
                            required
                        />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                        <span className="text-danger">*</span> Email Address
                        </label>
                        <div className="input-group">
                        <span className="input-group-text bg-white text-muted">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email address"
                            required
                        />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                        <span className="text-danger">*</span> Blog Category
                        </label>
                        <select className="form-select" id="category" required>
                        <option value="" disabled selected>Select the category of your blog</option>
                        <option value="technology">Technology</option>
                        <option value="business">Business</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="health">Health</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="blogDocument" className="form-label">
                            <span className="text-danger">*</span> Blog Document
                        </label>
                        <div className="border rounded p-4 text-center">
                            <FontAwesomeIcon icon={faUpload} className="fs-2 mb-3 text-primary" />
                            <p className="mb-1">Click or drag file to upload</p>
                            <small className="text-muted d-block mb-3">DOC/DOCX format only</small>
                            <input type="file" className="d-none" id="blogDocument" accept=".doc,.docx" required/>
                            <label htmlFor="blogDocument" className="btn btn-outline-primary">
                            Select File
                            </label>
                            <div className="mt-3">
                                <small className="text-muted">Only .doc or .docx files are accepted. Minimum 800 words required.</small>
                            </div>
                        </div>
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary py-2" style={{ backgroundColor: '#0d6efd', border: 'none' }}>
                        Submit Blog
                        </button>
                    </div>

                    {/* Submission Guidelines */}
                    <div className="mt-4">
                        <div 
                        className="p-3 border rounded d-flex align-items-center cursor-pointer" 
                        onClick={toggleGuidelines}
                        style={{ cursor: 'pointer' }}
                        >
                        <FontAwesomeIcon icon={faInfoCircle} className="text-primary me-2" />
                        <span className="fw-bold">Submission Guidelines</span>
                        <FontAwesomeIcon 
                            icon={faChevronDown} 
                            className="ms-auto" 
                            style={{ 
                            transform: isGuidelinesOpen ? 'rotate(180deg)' : 'rotate(0)', 
                            transition: 'transform 0.3s' 
                            }} 
                        />
                        </div>
                        
                        {isGuidelinesOpen && (
                        <div className="border border-top-0 rounded-bottom p-4">
                            <div className="d-flex mb-3 align-items-start">
                            <div className="p-2 bg-light rounded me-3">
                                <FontAwesomeIcon icon={faFileWord} className="text-primary" />
                            </div>
                            <div>
                                <h6 className="mb-1">File Format</h6>
                                <p className="text-muted mb-0">We accept Microsoft Word documents (.doc or .docx) only.</p>
                            </div>
                            </div>
                            
                            <div className="d-flex mb-3 align-items-start">
                            <div className="p-2 bg-light rounded me-3">
                                <FontAwesomeIcon icon={faAlignLeft} className="text-success" />
                            </div>
                            <div>
                                <h6 className="mb-1">Word Count</h6>
                                <p className="text-muted mb-0">Your blog must be at least 800 words long. Shorter submissions will be automatically rejected.</p>
                            </div>
                            </div>
                            
                            <div className="d-flex mb-3 align-items-start">
                            <div className="p-2 bg-light rounded me-3">
                                <FontAwesomeIcon icon={faCircle} className="text-warning" />
                            </div>
                            <div>
                                <h6 className="mb-1">Originality</h6>
                                <p className="text-muted mb-0">All content must be original. We use advanced plagiarism detection tools to verify originality.</p>
                            </div>
                            </div>
                            
                            <div className="d-flex align-items-start">
                            <div className="p-2 bg-light rounded me-3">
                                <FontAwesomeIcon icon={faClock} className="text-purple" />
                            </div>
                            <div>
                                <h6 className="mb-1">Processing Time</h6>
                                <p className="text-muted mb-0">Review typically takes 1-3 business days. You'll receive an email notification once your blog has been reviewed.</p>
                            </div>
                            </div>
                        </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}
