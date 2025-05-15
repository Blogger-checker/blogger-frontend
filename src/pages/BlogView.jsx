import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';

const API_URL = import.meta.env.VITE_API_URL;

export default function BlogView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/${id}`);
                setBlog(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError('Failed to load blog. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                <button 
                    className="btn btn-primary mt-3"
                    onClick={() => navigate('/blog-list')}
                >
                    Back to Blog List
                </button>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="container py-5">
                <div className="alert alert-warning" role="alert">
                    Blog not found
                </div>
                <button 
                    className="btn btn-primary mt-3"
                    onClick={() => navigate('/blog-list')}
                >
                    Back to Blog List
                </button>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <button 
                        className="btn btn-outline-primary mb-4"
                        onClick={() => navigate('/blog-list')}
                    >
                        ← Back to Blog List
                    </button>
                    
                    <article className="blog-post">
                        <header className="mb-4">
                            <h1 className="fw-bold mb-3">{blog.title}</h1>
                            <div className="d-flex align-items-center text-muted mb-4">
                                <span className="me-3">
                                    <FontAwesomeIcon icon={faUser} className="me-2" />
                                    {blog.authorName}
                                </span>
                                <span className="me-3">
                                    <FontAwesomeIcon icon={faCalendar} className="me-2" />
                                    {new Date(blog.publishedAt).toLocaleDateString()}
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faClock} className="me-2" />
                                    {Math.ceil(blog.wordCount / 200)} min read
                                </span>
                            </div>
                            <div className="mb-4">
                                <span className="badge bg-primary">{blog.category}</span>
                            </div>
                        </header>
                        
                        <div className="blog-content">
                            {blog.content.split('\n').map((paragraph, index) => (
                                <p key={index} className="mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
} 