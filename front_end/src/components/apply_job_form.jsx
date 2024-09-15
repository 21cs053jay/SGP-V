import React from 'react';
import MyNavbar from './shared/navbar';
const JobApplicationForm = () => {
    return (
        <div className='w-full flex flex-col'>
            <MyNavbar/>
{/* <div className="container mx-auto p-6">
<MyNavbar /> */}
        <div className="max-w-5xl mx-auto px-4 py-10">
            {/* Header Section */}
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Apply Now For Job Opening</h2>
            <p className="text-gray-700 mb-4">Fill the following details that match your resume</p>
            <p className="text-red-600 mb-8">* All Fields are Necessary.</p>

            {/* Form Section */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col">
                    <label htmlFor="fullName" className="mb-2 text-sm font-semibold">Full Name *</label>
                    <input
                        type="text"
                        id="fullName"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Name"
                        />
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col">
                    <label htmlFor="dob" className="mb-2 text-sm font-semibold">DOB *</label>
                    <input
                        type="date"
                        id="dob"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="DD / MM / YYYY"
                        />
                </div>

                {/* Qualification */}
                <div className="flex flex-col">
                    <label htmlFor="qualification" className="mb-2 text-sm font-semibold">Qualification *</label>
                    <input
                        type="text"
                        id="qualification"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Qualification"
                        />
                </div>

                {/* Experience */}
                <div className="flex flex-col">
                    <label htmlFor="experience" className="mb-2 text-sm font-semibold">Experience *</label>
                    <input
                        type="text"
                        id="experience"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Experience in Years"
                        />
                </div>

                {/* Present Employer */}
                <div className="flex flex-col">
                    <label htmlFor="presentEmployer" className="mb-2 text-sm font-semibold">Present Employer *</label>
                    <input
                        type="text"
                        id="presentEmployer"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Present Employer"
                        />
                </div>

                {/* Type of Industry */}
                <div className="flex flex-col">
                    <label htmlFor="industry" className="mb-2 text-sm font-semibold">Type of Industry *</label>
                    <input
                        type="text"
                        id="industry"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="eg. CHEMICAL, ENGG, FMCG, etc."
                        />
                </div>

                {/* Present Salary */}
                <div className="flex flex-col">
                    <label htmlFor="presentSalary" className="mb-2 text-sm font-semibold">Present Salary *</label>
                    <input
                        type="text"
                        id="presentSalary"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Annual CTC"
                        />
                </div>

                {/* Functional Role */}
                <div className="flex flex-col">
                    <label htmlFor="functionalRole" className="mb-2 text-sm font-semibold">Functional Role *</label>
                    <input
                        type="text"
                        id="functionalRole"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="eg. Maintenance, QC, QA, etc."
                        />
                </div>

                {/* Present Location */}
                <div className="flex flex-col">
                    <label htmlFor="presentLocation" className="mb-2 text-sm font-semibold">Present Location *</label>
                    <input
                        type="text"
                        id="presentLocation"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Present Location"
                        />
                </div>

                {/* Location Preference */}
                <div className="flex flex-col">
                    <label htmlFor="locationPreference" className="mb-2 text-sm font-semibold">Location Preference *</label>
                    <input
                        type="text"
                        id="locationPreference"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Location Preference"
                    />
                    <small className="text-gray-500 mt-1">(You can add more than one city by adding commas.)</small>
                </div>

                {/* Submit Button */}
                {/* <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
                        >
                        Submit Application
                    </button>
                </div> */}

                {/* Mobile */}
                <div className="flex flex-col">
                        <label htmlFor="mobile" className="mb-2 text-sm font-semibold">Mobile *</label>
                        <input
                            type="text"
                            id="mobile"
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="eg. [0] - [9999999999]"
                        />
                    </div>

                     {/* E-Mail */}
                     <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2 text-sm font-semibold">E-Mail *</label>
                        <input
                            type="email"
                            id="email"
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Email"
                        />
                    </div>

                      {/* Apply For */}
                      <div className="flex flex-col">
                        <label htmlFor="applyFor" className="mb-2 text-sm font-semibold">Apply For *</label>
                        <input
                            type="text"
                            id="applyFor"
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value="wordpress developer"
                            readOnly
                        />
                    </div>

                     {/* CV Upload */}
                    <div className="md:col-span-2 flex  flex-col items-center justify-center">
                        <label htmlFor="cvUpload" className="mb-2 text-sm font-semibold">CV Upload *</label>
                        <input
                            type="file"
                            id="cvUpload"
                            className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            accept=".pdf"
                        />
                        <small className="text-gray-500 mt-1">Only pdf files are allowed. (Maximum 5 MB)</small>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="w-48 bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition duration-300"
                        >
                            Apply Now
                        </button>
                    </div>
            </form>
        </div>
</div>
    );
}

export default JobApplicationForm;