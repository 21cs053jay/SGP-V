// import React from "react";
// import Sidebar from "./SideNavBar";
// import { Bar, Pie, Line } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// // Register required components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, PointElement, LineElement, Tooltip, Legend);

// const AdminAnalytics = () => {
//   // Static data for the analytics page
//   const analyticsData = {
//     totalPostedJobs: 120,
//     cvAgainstJobPost: 450,
//     representatives: [
//       { id: 1, name: "Alice Johnson", jobsPosted: 10, location: "New York" },
//       { id: 2, name: "Bob Smith", jobsPosted: 15, location: "San Francisco" }
//     ],
//     jobLocations: [
//       { name: "New York", count: 40 },
//       { name: "San Francisco", count: 30 },
//       { name: "Los Angeles", count: 25 }
//     ],
//     streams: [
//       { name: "Engineering", count: 50 },
//       { name: "Marketing", count: 20 },
//       { name: "Sales", count: 15 }
//     ],
//     qualifications: [
//       { name: "Bachelor's", count: 80 },
//       { name: "Master's", count: 30 },
//       { name: "PhD", count: 10 }
//     ]
//   };

//   // Data for charts
//   const jobLocationsData = {
//     labels: analyticsData.jobLocations.map(location => location.name),
//     datasets: [
//       {
//         label: "Jobs by Location",
//         data: analyticsData.jobLocations.map(location => location.count),
//         backgroundColor: "#4caf50"
//       }
//     ]
//   };

//   const streamsData = {
//     labels: analyticsData.streams.map(stream => stream.name),
//     datasets: [
//       {
//         label: "Jobs by Stream",
//         data: analyticsData.streams.map(stream => stream.count),
//         backgroundColor: "#ff5722"
//       }
//     ]
//   };

//   const qualificationsData = {
//     labels: analyticsData.qualifications.map(qual => qual.name),
//     datasets: [
//       {
//         label: "Candidates by Qualification",
//         data: analyticsData.qualifications.map(qual => qual.count),
//         backgroundColor: "#2196f3"
//       }
//     ]
//   };

//   return (
//     <div className="flex">
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-gray-100 h-screen overflow-hidden">
//         <h1 className="text-4xl font-extrabold text-gray-700 mb-8">Admin Analytics Dashboard</h1>

//         {/* Overview Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800">Total Posted Jobs</h3>
//             <p className="text-2xl font-bold text-blue-600">{analyticsData.totalPostedJobs}</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800">CVs Against Job Posts</h3>
//             <p className="text-2xl font-bold text-green-600">{analyticsData.cvAgainstJobPost}</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800">Total Representatives</h3>
//             <p className="text-2xl font-bold text-purple-600">{analyticsData.representatives.length}</p>
//           </div>
//         </div>

//         {/* Representative List Table */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Representative List</h3>
//           <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
//             <thead>
//               <tr className="bg-gray-200 text-left border-b border-gray-200">
//                 <th className="py-3 px-4 font-semibold">Representative</th>
//                 <th className="py-3 px-4 font-semibold">Jobs Posted</th>
//                 <th className="py-3 px-4 font-semibold">Primary Location</th>
//               </tr>
//             </thead>
//             <tbody>
//               {analyticsData.representatives.map(rep => (
//                 <tr key={rep.id} className="border-t transition duration-300 ease-in-out hover:bg-gray-100">
//                   <td className="py-3 px-4">{rep.name}</td>
//                   <td className="py-3 px-4">{rep.jobsPosted}</td>
//                   <td className="py-3 px-4">{rep.location}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Jobs by Location Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Jobs by Location</h3>
//             <Bar data={jobLocationsData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>

//           {/* Jobs by Stream Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Jobs by Stream</h3>
//             <Pie data={streamsData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>

//           {/* Candidates by Qualification Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Candidates by Qualification</h3>
//             <Line data={qualificationsData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminAnalytics;


import React from "react";
import Sidebar from "./SideNavBar";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components for ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, PointElement, LineElement, Tooltip, Legend);

const AdminAnalytics = () => {
  // Static data for the analytics page
  const analyticsData = {
    totalPostedJobs: 120,
    cvAgainstJobPost: 450,
    representatives: [
      {
        id: 1,
        name: "Alice Johnson",
        jobsPosted: 10,
        location: "New York",
        qualification: "Bachelor's",
        stream: "Engineering",
        industry: "IT",
        areaOfWork: "Development",
      },
      {
        id: 2,
        name: "Bob Smith",
        jobsPosted: 15,
        location: "San Francisco",
        qualification: "Master's",
        stream: "Marketing",
        industry: "Finance",
        areaOfWork: "Analysis",
      },
      // Add more representatives as needed
    ],
    jobLocations: [
      { name: "New York", count: 40 },
      { name: "San Francisco", count: 30 },
      { name: "Los Angeles", count: 25 },
    ],
    streams: [
      { name: "Engineering", count: 50 },
      { name: "Marketing", count: 20 },
      { name: "Sales", count: 15 },
    ],
    qualifications: [
      { name: "Bachelor's", count: 80 },
      { name: "Master's", count: 30 },
      { name: "PhD", count: 10 },
    ],
  };

  // Data for charts
  const jobLocationsData = {
    labels: analyticsData.jobLocations.map((location) => location.name),
    datasets: [
      {
        label: "Jobs by Location",
        data: analyticsData.jobLocations.map((location) => location.count),
        backgroundColor: "#4caf50",
        borderColor: "#388e3c",
        borderWidth: 2,
      },
    ],
  };

  const streamsData = {
    labels: analyticsData.streams.map((stream) => stream.name),
    datasets: [
      {
        label: "Jobs by Stream",
        data: analyticsData.streams.map((stream) => stream.count),
        backgroundColor: "#ff5722",
        borderColor: "#d84315",
        borderWidth: 2,
      },
    ],
  };

  const qualificationsData = {
    labels: analyticsData.qualifications.map((qual) => qual.name),
    datasets: [
      {
        label: "Candidates by Qualification",
        data: analyticsData.qualifications.map((qual) => qual.count),
        fill: true,
        backgroundColor: "#2196f3",
        borderColor: "#1976d2",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 h-screen overflow-auto">
        <h1 className="text-4xl font-extrabold text-gray-700 mb-8">Admin Analytics Dashboard</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">Total Posted Jobs</h3>
            <p className="text-2xl font-bold text-blue-600">{analyticsData.totalPostedJobs}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">CVs Against Job Posts</h3>
            <p className="text-2xl font-bold text-green-600">{analyticsData.cvAgainstJobPost}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">Total Representatives</h3>
            <p className="text-2xl font-bold text-purple-600">{analyticsData.representatives.length}</p>
          </div>
        </div>

        {/* Representative List Table with additional columns */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Representative List</h3>
          <div className="overflow-auto max-h-64">
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-left border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold">Representative</th>
                  <th className="py-3 px-4 font-semibold">Jobs Posted</th>
                  <th className="py-3 px-4 font-semibold">Location</th>
                  <th className="py-3 px-4 font-semibold">Qualification</th>
                  <th className="py-3 px-4 font-semibold">Stream</th>
                  <th className="py-3 px-4 font-semibold">Industry</th>
                  <th className="py-3 px-4 font-semibold">Area of Work</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.representatives.map((rep) => (
                  <tr key={rep.id} className="border-t transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="py-3 px-4">{rep.name}</td>
                    <td className="py-3 px-4">{rep.jobsPosted}</td>
                    <td className="py-3 px-4">{rep.location}</td>
                    <td className="py-3 px-4">{rep.qualification}</td>
                    <td className="py-3 px-4">{rep.stream}</td>
                    <td className="py-3 px-4">{rep.industry}</td>
                    <td className="py-3 px-4">{rep.areaOfWork}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Jobs by Location Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Jobs by Location</h3>
            <Bar data={jobLocationsData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>

          {/* Jobs by Stream Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Jobs by Stream</h3>
            <Pie data={streamsData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>

          {/* Candidates by Qualification Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Candidates by Qualification</h3>
            <Line data={qualificationsData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
