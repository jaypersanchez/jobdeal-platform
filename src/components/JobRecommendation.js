import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobRecommendation = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState(''); // State for the search keyword

  useEffect(() => {
    fetchJobListings('javascript developer'); // Default search term
  }, []); // Empty dependency array to run only on mount

  const fetchJobListings = async (searchTerm) => {
    const appId = process.env.REACT_APP_ADZUNA_APP_ID; // Get app_id from environment variable
    const appKey = process.env.REACT_APP_ADZUNA_API_KEY; // Get app_key from environment variable
    const url = `http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=20&what=${encodeURIComponent(searchTerm)}&content-type=application/json`;

    try {
      const response = await axios.get(url);
      setJobListings(response.data.results); // Store job listings in state
    } catch (error) {
      setError('Error fetching job listings');
      console.error('Error fetching job listings:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading to true while fetching
    fetchJobListings(keyword); // Fetch job listings based on the keyword
  };

  if (loading) {
    return <div>Loading job recommendations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="job-recommendation-modal">
      <h3>Job Recommendations</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} // Update keyword state
          placeholder="Enter job title or keyword"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {jobListings.map((job) => (
          <li key={job.adref}>
            <h4>{job.title}</h4>
            <p>{job.company.display_name}</p>
            <p>
              Salary: {job.salary_min} - {job.salary_max} GBP
            </p>
            <a href={job.redirect_url} target="_blank" rel="noopener noreferrer">
              View Job
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobRecommendation;