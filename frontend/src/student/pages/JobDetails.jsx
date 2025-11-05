import React, { useState } from 'react';
import { ArrowLeft, MapPin, IndianRupee, Users, Calendar, Briefcase, Clock, Building } from 'lucide-react';

const JobDetails = ({ job, onBack, onApply }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 pb-20 md:pb-6">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Jobs</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {job.id}
            </span>
            <span className="text-xs font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
              {job.status}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <p className="text-gray-600 mb-6">Full-time Position</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-3 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{job.location}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <IndianRupee className="w-5 h-5 mr-3 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Salary</p>
                <p className="font-medium">{job.salary}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <Users className="w-5 h-5 mr-3 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Openings</p>
                <p className="font-medium">{job.openings}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-3 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="font-medium">{job.deadline}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We are looking for a talented {job.title} to join our dynamic team. This is an excellent opportunity 
            for freshers and experienced professionals to work on cutting-edge projects.
          </p>
          
          <h3 className="font-semibold text-gray-900 mb-2">Key Responsibilities:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Develop and maintain web applications</li>
            <li>Collaborate with cross-functional teams</li>
            <li>Write clean, maintainable code</li>
            <li>Participate in code reviews</li>
            <li>Stay updated with latest technologies</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mb-2">Required Skills:</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {['React', 'JavaScript', 'HTML', 'CSS', 'Git', 'REST APIs'].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>

          <h3 className="font-semibold text-gray-900 mb-2">Benefits:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Competitive salary package</li>
            <li>Work from home flexibility</li>
            <li>Health insurance</li>
            <li>Learning and development opportunities</li>
            <li>Friendly work environment</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Company Information</h2>
          <div className="flex items-start space-x-3 mb-4">
            <Building className="w-6 h-6 text-indigo-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">Tech Solutions Pvt Ltd</h3>
              <p className="text-gray-600 text-sm">Software Development Company</p>
            </div>
          </div>
          <p className="text-gray-700">
            A leading technology company focused on delivering innovative solutions to clients worldwide.
          </p>
        </div>

        <div className="fixed bottom-16 md:bottom-6 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => onApply(job)}
              className="w-full px-6 py-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
            >
              <Briefcase className="w-5 h-5" />
              <span>Apply for this Position</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
