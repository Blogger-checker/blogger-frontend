import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faLink } from '@fortawesome/free-solid-svg-icons';

export default function PublishStep({ reviewResult }) {
    const isApproved = reviewResult.passed;
    const blogLink = isApproved ? "https://blogcheck.com/blogs/your-blog-id" : null;

    return (
        <div className="container py-4">
            <div className="card">
                <div className="card-body text-center">
                    {isApproved ? (
                        <>
                            <FontAwesomeIcon 
                                icon={faCheckCircle} 
                                className="text-success mb-3" 
                                style={{ fontSize: '4rem' }} 
                            />
                            <h3 className="mb-3">Congratulations! Your Blog is Live</h3>
                            <p className="text-muted mb-4">
                                Your blog has been successfully published and is now available for readers.
                            </p>
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon 
                                icon={faTimesCircle} 
                                className="text-danger mb-3" 
                                style={{ fontSize: '4rem' }} 
                            />
                            <h3 className="mb-3">Blog Submission Failed</h3>
                            <p className="text-muted mb-4">
                                {!reviewResult.wordCountPassed 
                                    ? "Your content is shorter than the required 800 words. Please add more content and try again."
                                    : !reviewResult.plagiarismPassed 
                                        ? "Plagiarism was detected in your content. Please ensure your content is original and try again."
                                        : "Your blog submission could not be processed. Please try again."}
                            </p>
                        </>
                    )}
                    
                    <button 
                        className="btn btn-primary"
                        onClick={() => window.location.href = '/'}
                    >
                        Submit Another Blog
                    </button>
                </div>
            </div>
        </div>
    );
} 