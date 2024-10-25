import React, { useRef, useState } from 'react';
import MyNavbar from './shared/navbar';
import { useNavigate } from 'react-router-dom';

// Static job data for carousel
const jobData = [
  {
    id: 1,
    company: "Google",
    location: "India",
    role: "FullStack Developer",
    description: "I need senior Fullstack developer, who can write efficient code and handle both frontend and backend.",
    positions: "2 Positions",
    type: "Full Time",
    salary: "45 LPA",
  },
  {
    id: 2,
    company: "Microsoft India",
    location: "India",
    role: "Fullstack Developer",
    description: "A senior developer to write efficient code for both frontend and backend.",
    positions: "2 Positions",
    type: "Full Time",
    salary: "23 LPA",
  },
  {
    id: 3,
    company: "JobHunt",
    location: "India",
    role: "Frontend Developer",
    description: "A professional frontend developer to create UI web pages.",
    positions: "12 Positions",
    type: "Full Time",
    salary: "14 LPA",
  },
  {
    id: 1,
    company: "Google",
    location: "India",
    role: "FullStack Developer",
    description: "I need senior Fullstack developer, who can write efficient code and handle both frontend and backend.",
    positions: "2 Positions",
    type: "Full Time",
    salary: "45 LPA",
  },
  {
    id: 2,
    company: "Microsoft India",
    location: "India",
    role: "Fullstack Developer",
    description: "A senior developer to write efficient code for both frontend and backend.",
    positions: "2 Positions",
    type: "Full Time",
    salary: "23 LPA",
  },
  {
    id: 3,
    company: "JobHunt",
    location: "India",
    role: "Frontend Developer",
    description: "A professional frontend developer to create UI web pages.",
    positions: "12 Positions",
    type: "Full Time",
    salary: "14 LPA",
  },
  // Add more jobs as needed...
];

const Home = () => {
  const [localSearch, setLocalSearch] = useState(""); // Local state for homepage search
  const navigate = useNavigate();
  
  // Ref to the carousel container
  const carouselRef = useRef(null);

  // Scroll left/right when arrow buttons are clicked
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({
        top: 0,
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Mouse dragging logic
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll fast
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  // Function to handle user search
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/Browsejobs/${localSearch}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <MyNavbar/>

      {/* Hero Section */}
      <div className="text-center my-10">
        <h1 className="text-5xl font-bold mb-4">Search, Apply & <br/>Get Your <span className='text-purple-600'>Dream</span> Jobs</h1>
        <p className="text-gray-500 mb-8">Find jobs that match your skillset and location</p>

        {/* Search Bar */}
        <form className="flex items-center justify-center" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="border-2 border-gray-300 rounded-full px-6 py-3 w-80"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          <button
            type="submit"
            className="ml-3 bg-purple-600 text-white px-6 py-3 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </form>
      </div>

      {/* Job Openings Section */}
      <div className="my-10 text-center relative">
        <div className='text-center'><h2 className="text-3xl font-bold mb-10">Latest and Top Job Openings</h2></div>

        {/* Left Arrow */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4 ml-3 bg-gray-200 hover:bg-gray-300 rounded-full"
          onClick={() => scrollCarousel('left')}
        >
          &#8592;
        </button>

        {/* Job Carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-scroll scrollbar-hide md:scrollbar-default space-x-6 mx-auto w-11/12"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {jobData.map((job) => (
            <div key={job.id} className="flex-none bg-white shadow-md rounded-lg p-6 w-96">
              <h3 className="text-xl font-semibold">{job.company}</h3>
              <p className="text-gray-500">{job.location}</p>
              <h4 className="mt-2 font-bold">{job.role}</h4>
              <p className="text-gray-700 mt-1">{job.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-purple-600 font-semibold">{job.positions}</span>
                <span className="text-purple-600 font-semibold">{job.type}</span>
                <span className="text-purple-600 font-semibold">{job.salary}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4 mr-3 bg-gray-200 hover:bg-gray-300 rounded-full"
          onClick={() => scrollCarousel('right')}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Home;
