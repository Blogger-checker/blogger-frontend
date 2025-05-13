import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function ReviewStep({ blogData, onReviewComplete }) {
    const [reviewStatus, setReviewStatus] = useState({
        wordCount: { checking: true, passed: false },
        plagiarism: { checking: true, passed: false }
    });
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Simulate checking word count
        setTimeout(() => {
            const wordCount = blogData.wordCount || 0;
            setReviewStatus(prev => ({
                ...prev,
                wordCount: {
                    checking: false,
                    passed: wordCount >= 800
                }
            }));
        }, 2000);

        // Simulate checking plagiarism
        setTimeout(() => {
            const isPlagiarized = blogData.isPlagiarized || false;
            setReviewStatus(prev => ({
                ...prev,
                plagiarism: {
                    checking: false,
                    passed: !isPlagiarized
                }
            }));
        }, 3000);
    }, [blogData]);

    useEffect(() => {
        if (!reviewStatus.wordCount.checking && !reviewStatus.plagiarism.checking) {
            setIsComplete(true);
            onReviewComplete({
                passed: reviewStatus.wordCount.passed && reviewStatus.plagiarism.passed,
                wordCountPassed: reviewStatus.wordCount.passed,
                plagiarismPassed: reviewStatus.plagiarism.passed
            });
        }
    }, [reviewStatus, onReviewComplete]);

    return (
        <div className="container py-4">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title mb-4">Reviewing Your Blog</h3>
                    
                    <div className="review-item mb-4">
                        <div className="d-flex align-items-center">
                            <div className="me-3">
                                {reviewStatus.wordCount.checking ? (
                                    <FontAwesomeIcon icon={faSpinner} spin className="text-primary" />
                                ) : reviewStatus.wordCount.passed ? (
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                                ) : (
                                    <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />
                                )}
                            </div>
                            <div>
                                <h5 className="mb-1">Word Count Check</h5>
                                <p className="text-muted mb-0">
                                    {reviewStatus.wordCount.checking 
                                        ? "Checking word count..." 
                                        : reviewStatus.wordCount.passed 
                                            ? "Word count requirement met (800+ words)"
                                            : "Word count requirement not met (minimum 800 words)"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="review-item">
                        <div className="d-flex align-items-center">
                            <div className="me-3">
                                {reviewStatus.plagiarism.checking ? (
                                    <FontAwesomeIcon icon={faSpinner} spin className="text-primary" />
                                ) : reviewStatus.plagiarism.passed ? (
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                                ) : (
                                    <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />
                                )}
                            </div>
                            <div>
                                <h5 className="mb-1">Plagiarism Check</h5>
                                <p className="text-muted mb-0">
                                    {reviewStatus.plagiarism.checking 
                                        ? "Checking for plagiarism..." 
                                        : reviewStatus.plagiarism.passed 
                                            ? "Content is original"
                                            : "Plagiarism detected"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 