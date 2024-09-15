import React from "react";
import Sidebar from "./SideNavBar";

const JobPosting = () => {
  return (
    <div className="flex h-screen">
      {/* Left SideNav (Fixed Position) */}
      <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-10 overflow-y-auto">
        <h1 className="text-xl font-semibold mb-8 pb-2 border-b text-gray-700">
          Add Company Job Posting Information
        </h1>

        {/* Form */}
        <form className="border p-6 rounded-md shadow-md bg-white max-w-4xl mx-auto">
          {/* Styling Box Container */}
          <div className="space-y-4 border border-gray-300 p-4 bg-gray-50">

            {/* JID */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">JID</label>
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter Job ID"
              />
            </div>

            {/* Job Title */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Job Title</label>
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter Job Title"
              />
            </div>

            {/* Keyskills */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Keyskills</label>
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter Key Skills"
              />
            </div>

            {/* Qualification (Checkboxes) */}
            <div className="flex items-start space-x-4">
              <label className="w-1/4 font-medium">Qualification</label>
              <div className="flex-1 space-y-2">
                <div>
                  <input type="checkbox" id="bcom" />
                  <label htmlFor="bcom" className="ml-2">B COM / BBA / BA / BCA</label>
                </div>
                <div>
                  <input type="checkbox" id="bpharma" />
                  <label htmlFor="bpharma" className="ml-2">B Pharma / M Pharma</label>
                </div>
                <div>
                  <input type="checkbox" id="be" />
                  <label htmlFor="be" className="ml-2">BE / ME</label>
                </div>
                <div>
                  <input type="checkbox" id="bsc" />
                  <label htmlFor="bsc" className="ml-2">BSC / MSC</label>
                </div>
              </div>
            </div>

            {/* Stream (Radio Buttons) */}
            <div className="flex items-start space-x-4">
              <label className="w-1/4 font-medium">Stream</label>
              <div className="flex-1 space-y-2">
                <div>
                  <input type="radio" id="agriculture" name="stream" />
                  <label htmlFor="agriculture" className="ml-2">Agriculture</label>
                </div>
                <div>
                  <input type="radio" id="arts" name="stream" />
                  <label htmlFor="arts" className="ml-2">Arts</label>
                </div>
                <div>
                  <input type="radio" id="chemicals" name="stream" />
                  <label htmlFor="chemicals" className="ml-2">Chemicals</label>
                </div>
                <div>
                  <input type="radio" id="chemistry" name="stream" />
                  <label htmlFor="chemistry" className="ml-2">Chemistry</label>
                </div>
              </div>
            </div>

            {/* Company Name */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Company Name</label>
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter Company Name"
              />
            </div>

            {/* Job Location */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Job Location(S)</label>
              <div className="flex-1 flex space-x-2">
                <select className="w-1/2 p-2 border border-gray-300 rounded-md">
                  <option>Select State</option>
                </select>
                <select className="w-1/2 p-2 border border-gray-300 rounded-md">
                  <option>Select City</option>
                </select>
              </div>
            </div>

            {/* Industry Type (Checkboxes) */}
            <div className="flex items-start space-x-4">
              <label className="w-1/4 font-medium">Industry Type</label>
              <div className="flex-1 space-y-2">
                <div>
                  <input type="checkbox" id="automobile" />
                  <label htmlFor="automobile" className="ml-2">Automobile / Auto - Ancilliary / Earth Moving Equipment</label>
                </div>
                <div>
                  <input type="checkbox" id="chemical" />
                  <label htmlFor="chemical" className="ml-2">Chemical / Agro Chemicals / Pesticides</label>
                </div>
                <div>
                  <input type="checkbox" id="electrical" />
                  <label htmlFor="electrical" className="ml-2">Electrical / Electronics / Instrumentation</label>
                </div>
                <div>
                  <input type="checkbox" id="epc" />
                  <label htmlFor="epc" className="ml-2">EPC</label>
                </div>
              </div>
            </div>

            {/* Salary */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Salary in INR/Annum</label>
              <div className="flex-1 flex space-x-2">
                <input
                  type="number"
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  placeholder="Min Salary"
                />
                <input
                  type="number"
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  placeholder="Max Salary"
                />
              </div>
            </div>

            {/* Experience */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Experience (Years)</label>
              <div className="flex-1 flex space-x-2">
                <input
                  type="number"
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  placeholder="Min Experience"
                />
                <input
                  type="number"
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  placeholder="Max Experience"
                />
              </div>
            </div>

            {/* Job Description */}
            <div className="flex items-start space-x-4">
              <label className="w-1/4 font-medium">Job Description</label>
              <textarea
                className="flex-1 p-2 border border-gray-300 rounded-md"
                rows="4"
                placeholder="Enter Job Description"
              ></textarea>
            </div>

            {/* Contact Information */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Posted By</label>
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter Your Name"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Phone Number</label>
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter Your Phone Number"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Email ID</label>
              <input
                type="email"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter Your Email ID"
              />
            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mt-6"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPosting;
