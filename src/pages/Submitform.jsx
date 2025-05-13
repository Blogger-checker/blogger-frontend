import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faClock, faEnvelope, faFileWord, faUser, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faAlignLeft, faChevronDown, faInfoCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import ReviewStep from './ReviewStep';
import PublishStep from './PublishStep';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function Submitform() {
    const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(true);
    const [currentStep, setCurrentStep] = useState('submit');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        category: '',
        title: '',
        file: null,
        wordCount: 0,
        isPlagiarized: false
    });
    const [reviewResult, setReviewResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleGuidelines = () => {
        setIsGuidelinesOpen(!isGuidelinesOpen);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate form fields first
            if (!formData.fullName || !formData.email || !formData.category || !formData.title) {
                setError('Please fill in all required fields (Name, Email, Category, and Title) before uploading the file.');
                return;
            }

            setLoading(true);
            setError('');
            
            try {
                // Create FormData for file upload
                const formDataToSend = new FormData();
                formDataToSend.append('blogFile', file);
                formDataToSend.append('authorName', formData.fullName);
                formDataToSend.append('email', formData.email);
                formDataToSend.append('category', formData.category);
                formDataToSend.append('title', formData.title);

                console.log('Sending data:', {
                    authorName: formData.fullName,
                    email: formData.email,
                    category: formData.category,
                    title: formData.title,
                    fileName: file.name
                });

                // Send file to backend for processing
                const response = await axios.post(`${API_URL}/submit`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('Full server response:', response);
                console.log('Response data:', response.data);

                if (!response.data) {
                    throw new Error('No response data received from server');
                }

                // Check if the response contains the expected data
                if (!response.data.blogId) {
                    console.error('Server response missing blogId:', response.data);
                    throw new Error('Server response is missing required data. Please try again.');
                }

                const { wordCount, isPlagiarized, blogId, publishedUrl } = response.data;

                setFormData(prev => ({
                    ...prev,
                    file,
                    wordCount,
                    isPlagiarized,
                    blogId,
                    publicUrl: publishedUrl
                }));

                if (wordCount < 800) {
                    setError('Your blog must be at least 800 words long.');
                } else if (isPlagiarized) {
                    setError('Plagiarism detected in your content. Please ensure your content is original.');
                } else {
                    // Clear any previous errors if everything is successful
                    setError('');
                }
            } catch (err) {
                console.error('Error details:', {
                    message: err.message,
                    response: err.response?.data,
                    status: err.response?.status,
                    fullError: err
                });
                
                if (err.response?.data?.message) {
                    setError(err.response.data.message);
                } else if (err.message) {
                    setError(err.message);
                } else {
                    setError('Error processing your blog. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validate all required fields
        if (!formData.fullName || !formData.email || !formData.category || !formData.title || !formData.file) {
            setError('Please fill in all required fields and upload a file.');
            return;
        }

        if (formData.wordCount < 800) {
            setError('Your blog must be at least 800 words long.');
            return;
        }
        if (formData.isPlagiarized) {
            setError('Plagiarism detected in your content. Please ensure your content is original.');
            return;
        }

        try {
            // Move to publish step since the blog is already published in handleFileChange
            setCurrentStep('publish');
            setReviewResult({
                publishedUrl: formData.publicUrl
            });

            // Set timeout to return to submit page after 10 seconds
            setTimeout(() => {
                setCurrentStep('submit');
                setFormData({
                    fullName: '',
                    email: '',
                    category: '',
                    title: '',
                    file: null,
                    wordCount: 0,
                    isPlagiarized: false,
                    blogId: null,
                    publicUrl: null
                });
                setReviewResult(null);
            }, 10000);
        } catch (err) {
            console.error('Error:', err);
            setError('Error processing your blog. Please try again.');
        }
    };

    const handleReviewComplete = async (result) => {
        try {
            if (!formData.blogId) {
                setError('Blog ID is missing. Please try submitting again.');
                return;
            }

            // Call API to publish the blog
            const response = await axios.post(`${API_URL}/${formData.blogId}/publish`);
            setReviewResult({
                ...result,
                publishedUrl: response.data.publishedUrl
            });
            setCurrentStep('publish');

            // Set timeout to return to submit page after 10 seconds
            setTimeout(() => {
                setCurrentStep('submit');
                setFormData({
                    fullName: '',
                    email: '',
                    category: '',
                    title: '',
                    file: null,
                    wordCount: 0,
                    isPlagiarized: false
                });
                setReviewResult(null);
            }, 10000);
        } catch (err) {
            console.error('Publish error:', err);
            setError('Error publishing your blog. Please try again.');
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 'submit':
                return (
                    <form onSubmit={handleSubmit}>
                        {/* Existing form content */}
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
                                    value={formData.fullName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
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
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                <span className="text-danger">*</span> Blog Title
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white text-muted">
                                    <FontAwesomeIcon icon={faAlignLeft} />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    placeholder="Enter your blog title"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                <span className="text-danger">*</span> Blog Category
                            </label>
                            <select 
                                className="form-select" 
                                id="category" 
                                required
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                            >
                                <option value="" disabled>Select the category of your blog</option>
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
                                <input 
                                    type="file" 
                                    className="d-none" 
                                    id="blogDocument" 
                                    accept=".doc,.docx" 
                                    required
                                    onChange={handleFileChange}
                                    disabled={loading}
                                />
                                <label htmlFor="blogDocument" className={`btn btn-outline-primary ${loading ? 'disabled' : ''}`}>
                                    {loading ? 'Processing...' : 'Select File'}
                                </label>
                                <div className="mt-3">
                                    <small className="text-muted">Only .doc or .docx files are accepted. Minimum 800 words required.</small>
                                </div>
                                {error && (
                                    <div className="alert alert-danger mt-3 mb-0">
                                        {error}
                                    </div>
                                )}
                                {formData.wordCount > 0 && (
                                    <div className="mt-3">
                                        <p className="mb-1">Word Count: {formData.wordCount}</p>
                                        {formData.isPlagiarized && (
                                            <p className="text-danger mb-0">Plagiarism detected!</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary py-2">
                                Submit Blog
                            </button>
                        </div>
                    </form>
                );
            case 'review':
                return <ReviewStep blogData={formData} onReviewComplete={handleReviewComplete} />;
            case 'publish':
                return (
                    <div className="text-center py-5">
                        <div className="mb-4">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-success" style={{ fontSize: '4rem' }} />
                        </div>
                        <h3 className="mb-3">Blog Published Successfully!</h3>
                        <p className="text-muted mb-4">
                            Your blog has been published and is now available to readers.
                            {reviewResult?.publishedUrl && (
                                <div className="mt-3">
                                    <a href={reviewResult.publishedUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                        View Published Blog
                                    </a>
                                </div>
                            )}
                        </p>
                        <p className="text-muted">
                            You will be redirected to the submit page in 10 seconds...
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-light min-vh-100">
            <div className="container py-4 bg-light">
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
                                <div className={`rounded-circle ${currentStep === 'submit' ? 'bg-primary' : 'bg-light'} ${currentStep === 'submit' ? 'text-white' : 'text-dark'} border border-1 d-flex align-items-center justify-content-center mb-2`} 
                                    style={{ width: '32px', height: '32px', fontSize: '0.875rem' }}>
                                    1
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <span className="fw-bold" style={{ fontSize: '0.9rem' }}>Submit</span>
                                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>Upload your blog</span>
                                </div>
                            </div>

                            <div className="d-flex flex-column align-items-center">
                                <div className={`rounded-circle ${currentStep === 'review' ? 'bg-primary' : 'bg-light'} ${currentStep === 'review' ? 'text-white' : 'text-dark'}  border border-1  d-flex align-items-center justify-content-center mb-2`} 
                                    style={{ width: '32px', height: '32px', fontSize: '0.875rem' }}>
                                    2
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <span className="fw-bold" style={{ fontSize: '0.9rem' }}>Review</span>
                                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>We check content</span>
                                </div>
                            </div>

                            <div className="d-flex flex-column align-items-center">
                                <div className={`rounded-circle ${currentStep === 'publish' ? 'bg-primary' : 'bg-light'} ${currentStep === 'publish' ? 'text-white' : 'text-dark'} border border-1 d-flex align-items-center justify-content-center mb-2`} 
                                    style={{ width: '32px', height: '32px', fontSize: '0.875rem' }}>
                                    3
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <span className="fw-bold" style={{ fontSize: '0.9rem' }}>Publish</span>
                                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>If approved</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {renderStep()}

                    {/* Submission Guidelines */}
                    {currentStep === 'submit' && (
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
                    )}
                </div>
            </div>
        </div>
    );
}
