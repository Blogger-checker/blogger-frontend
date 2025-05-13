import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort, faTh, faThList } from '@fortawesome/free-solid-svg-icons';
import { faClock, faEnvelope, faEye, faIdCard, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import banner from '../src/assets/blog-list-hero-img.jpg';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function Blogslist() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/published`);
      console.log(response.data)
      setBlogs(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch blogs. Please try again later.');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.authorName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    } else if (sortBy === 'oldest') {
      return new Date(a.publishedAt) - new Date(b.publishedAt);
    }
    return 0;
  });

  const categories = [...new Set(blogs.map(blog => blog.category))];

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
      <div className="alert alert-danger m-4" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <div className="hero-banner position-relative" style={{overflow: 'hidden'}}>
        <img src={banner} alt="Library background" className="w-100 h-100 object-fit-cover" />
        <div className="banner-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-lg-6">
                <div className="banner-content bg-white bg-opacity-90 p-4 rounded">
                  <h2 className="h3 fw-bold mb-2">Browse Published Blogs</h2>
                  <p className="text-secondary mb-3">Discover insightful articles from our community of expert writers across various topics.</p>
                  <div className="search-bar">
                    <div className="input-group mb-3">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search for blogs, topics, authors..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button className="btn btn-primary" type="button">Search</button>
                    </div>
                  </div>
                  <div className="popular-searches">
                    <span className="text-secondary small me-2">Popular categories:</span>
                    <div className="d-inline-flex flex-wrap gap-1">
                      {categories.slice(0, 5).map((category, index) => (
                        <span 
                          key={index} 
                          className="badge bg-light text-dark border"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content py-5">
        <div className="container">
          <div className="row">
            {/* Blog List Section */}
            <div className="col-lg-8">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="filters d-flex align-items-center">
                  <div className="filter-dropdown me-3">
                    <span className="text-secondary me-2">
                      <FontAwesomeIcon icon={faFilter} size="sm" /> Filter:
                    </span>
                    <select 
                      className="form-select form-select-sm d-inline-block w-auto"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sort-dropdown">
                    <span className="text-secondary me-2">
                      <FontAwesomeIcon icon={faSort} size="sm" /> Sort:
                    </span>
                    <select 
                      className="form-select form-select-sm d-inline-block w-auto"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                  </div>
                </div>
                <div className="view-options">
                  <span className="text-secondary me-2">View:</span>
                  <div className="btn-group" role="group">
                    <button 
                      type="button" 
                      className={`btn btn-outline-secondary btn-sm ${viewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <FontAwesomeIcon icon={faThList} />
                    </button>
                    <button 
                      type="button" 
                      className={`btn btn-outline-secondary btn-sm ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <FontAwesomeIcon icon={faTh} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="blog-count mb-4">
                <p className="text-secondary">Showing {filteredBlogs.length} of {blogs.length} blogs</p>
              </div>

              <div className={`row g-4 ${viewMode === 'list' ? 'flex-column' : ''}`}>
                {sortedBlogs.map((blog, index) => (
                  <div key={blog._id} className={viewMode === 'list' ? 'col-12' : 'col-md-6'}>
                    <div className="card blog-card h-100 border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="mb-3">
                          <span className="badge bg-light text-primary">{blog.category}</span>
                          <span className="ms-2 text-secondary small">
                            <i className="far fa-calendar me-1"></i> {new Date(blog.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h5 className="card-title fw-bold mb-3">{blog.title}</h5>
                        <p className="card-text text-secondary">
                          {blog.content?.substring(0, 150)}...
                        </p>
                        <div className="d-flex align-items-center mb-3">
                          <span className="fw-medium">{blog.authorName}</span>
                        </div>
                        <a href={blog.publicUrl} className="btn btn-primary btn-sm">Read More</a>
                      </div>
                      <div className="card-footer bg-white border-0 py-3">
                        <div className="d-flex align-items-center text-secondary small">
                          <span className="me-3">
                            <FontAwesomeIcon icon={faClock} className="me-1" /> {Math.ceil(blog.wordCount / 200)} min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredBlogs.length === 0 && (
                <div className="text-center py-5">
                  <p className="text-secondary">No blogs found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="sidebar ps-lg-4">
                {/* Popular Categories */}
                <div className="card mb-4 border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title mb-3 d-flex align-items-center">
                      <span className="badge bg-light text-primary me-2">
                        <FontAwesomeIcon icon={faTh} />
                      </span>
                      Popular Categories
                    </h5>
                    <ul className="list-group list-group-flush">
                      {categories.map((category, index) => {
                        const count = blogs.filter(blog => blog.category === category).length;
                        return (
                          <li key={index} className="list-group-item border-0 d-flex justify-content-between align-items-center py-2">
                            <span>{category}</span>
                            <span className="badge bg-primary rounded-pill">{count}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Newsletter Subscription */}
                <div className="card bg-primary text-white border-0">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-3 d-flex align-items-center">
                      <span className="badge bg-white text-primary me-2">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      Subscribe to Newsletter
                    </h5>
                    <p className="mb-3">Get the latest blogs delivered directly to your inbox.</p>
                    <form>
                      <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Your email address" />
                      </div>
                      <button type="submit" className="btn btn-light w-100">Subscribe Now</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
