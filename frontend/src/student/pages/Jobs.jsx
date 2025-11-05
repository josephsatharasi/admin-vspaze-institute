import React, { useState } from 'react';
import { MapPin, IndianRupee, Users, Calendar, Filter, ArrowRight, Menu } from 'lucide-react';
import JobDetails from './JobDetails';
import JobApplication from './JobApplication';

const Jobs = ({ onMenuClick }) => {
  const [activeTab, setActiveTab] = useState('open');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);

  const tabs = [
    { id: 'open', label: 'Open To Apply' },
    { id: 'applied', label: 'Applied' },
    { id: 'interview', label: 'Interview' },
    { id: 'placed', label: 'Placed' }
  ];

  const jobs = [
    {
      id: 'MiFCED7BF0BD',
      title: 'Frontend Developer',
      location: 'Work From Home',
      salary: '₹3L - ₹5L',
      openings: '5 Openings',
      deadline: 'Apply by: 30 Oct 25, 10:00 AM',
      status: 'Open'
    },
    {
      id: 'Ap2C8D5D66AA',
      title: 'Intern Node Js Developer',
      location: 'Work From Home',
      salary: '₹3L - ₹3.6L',
      openings: '2 Openings',
      deadline: 'Apply by: 30 Oct 25, 11:30 AM',
      status: 'Open'
    },
    {
      id: 'Bk9F2E8C44DD',
      title: 'Full Stack Developer',
      location: 'Work From Home',
      salary: '₹4L - ₹6L',
      openings: '3 Openings',
      deadline: 'Apply by: 31 Oct 25, 09:00 AM',
      status: 'Open'
    }
  ];

  if (applyingJob) {
    return (
      <JobApplication 
        job={applyingJob} 
        onBack={() => setApplyingJob(null)}
        onSubmit={() => {
          setApplyingJob(null);
          setActiveTab('applied');
        }}
      />
    );
  }

  if (selectedJob) {
    return (
      <JobDetails 
        job={selectedJob} 
        onBack={() => setSelectedJob(null)}
        onApply={(job) => {
          setSelectedJob(null);
          setApplyingJob(job);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 pb-20 md:pb-6">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-gray-100 rounded-full">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                  <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
                <p className="text-sm text-gray-600">2000+ Companies Hired Students</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Filter className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {job.id}
              </span>
              <span className="text-xs font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                {job.status}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">{job.title}</h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <IndianRupee className="w-4 h-4 mr-2" />
                <span className="text-sm">{job.salary}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">{job.openings}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">{job.deadline}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => setSelectedJob(job)}
                className="flex-1 px-4 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-medium hover:bg-indigo-50 transition"
              >
                View Details
              </button>
              <button 
                onClick={() => setApplyingJob(job)}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition flex items-center justify-center"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
