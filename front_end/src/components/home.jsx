import React, { useState } from 'react';
import MyNavbar from './shared/navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [localSearch, setLocalSearch] = useState(""); // Local state for homepage search
    const navigate = useNavigate();
  
    // const handleSearch = (e) => {
    //   e.preventDefault();
    //   setSearchTerm(localSearch); // Pass the search term to BrowseJobs
    //   navigate("/browse-jobs"); // Navigate to the BrowseJobs page to see results
    // };
  
    return (
        <div className="w-full h-screen flex flex-col bg-gray-100">
        <MyNavbar/>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Search, Apply & Get Your Dream Jobs</h1>
          <p className="text-gray-500 mb-8">Find jobs that match your skillset and location</p>
          
          <form className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Find your dream jobs"
              className="border-2 border-gray-300 rounded-full px-6 py-3 w-96"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            <button
              type="submit"
              className="ml-3 bg-purple-600 text-white px-6 py-3 rounded-full"
              onClick={()=>navigate(`/Browsejobs/${localSearch}`)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </form>
        </div>
  
        <div className="mt-16">
          <h2 className="text-2xl font-bold">Latest and Top Job Openings</h2>
          {/* You can add a job carousel or static job cards here */}
        </div>
      </div>
    );
  };

export default Home;