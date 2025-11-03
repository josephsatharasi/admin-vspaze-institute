import React, { useState } from 'react';
import { TrendingUp, MapPin, Calendar, ExternalLink, Play, Award, Users, Building } from 'lucide-react';

const SuccessStories = () => {
  const [activeTab, setActiveTab] = useState('recent');

  const recentPlacements = [
    { name: 'Rahul Sharma', course: 'Full Stack Development', company: 'TCS', package: '₹8.5 LPA', location: 'Bangalore', days: 2 },
    { name: 'Priya Patel', course: 'Data Science', company: 'Infosys', package: '₹12 LPA', location: 'Pune', days: 5 },
    { name: 'Amit Kumar', course: 'Cloud Computing', company: 'Wipro', package: '₹9.2 LPA', location: 'Hyderabad', days: 8 },
    { name: 'Sneha Reddy', course: 'Digital Marketing', company: 'Accenture', package: '₹7.8 LPA', location: 'Chennai', days: 12 }
  ];

  const successStories = [
    {
      name: 'Vikram Singh',
      course: 'Full Stack Development',
      beforeSalary: '₹3.2 LPA',
      afterSalary: '₹12 LPA',
      company: 'Microsoft',
      duration: '6 months',
      story: 'From a struggling fresher to Microsoft developer. Vspaze transformed my career completely.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      linkedin: '#'
    },
    {
      name: 'Anjali Gupta',
      course: 'Data Science & AI',
      beforeSalary: '₹4 LPA',
      afterSalary: '₹15 LPA',
      company: 'Amazon',
      duration: '8 months',
      story: 'Switched from manual testing to AI engineer. Best decision of my career!',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      linkedin: '#'
    },
    {
      name: 'Rohit Mehta',
      course: 'Cloud Computing',
      beforeSalary: '₹5 LPA',
      afterSalary: '₹18 LPA',
      company: 'Google',
      duration: '5 months',
      story: 'From support engineer to cloud architect at Google. Dreams do come true!',
      image: 'https://randomuser.me/api/portraits/men/25.jpg',
      linkedin: '#'
    }
  ];

  const hiringPartners = [
    { name: 'TCS', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Tata-Consultancy-Services-TCS-Logo.png' },
    { name: 'Infosys', logo: 'https://logos-world.net/wp-content/uploads/2020/06/Infosys-Logo.png' },
    { name: 'Wipro', logo: 'https://logos-world.net/wp-content/uploads/2020/06/Wipro-Logo.png' },
    { name: 'Accenture', logo: 'https://logos-world.net/wp-content/uploads/2020/06/Accenture-Logo.png' },
    { name: 'Microsoft', logo: 'https://logos-world.net/wp-content/uploads/2020/06/Microsoft-Logo.png' },
    { name: 'Amazon', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png' },
    { name: 'Google', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png' },
    { name: 'IBM', logo: 'https://logos-world.net/wp-content/uploads/2020/09/IBM-Logo.png' },
    { name: 'Cognizant', logo: 'https://logos-world.net/wp-content/uploads/2020/06/Cognizant-Logo.png' },
    { name: 'HCL', logo: 'https://logos-world.net/wp-content/uploads/2020/06/HCL-Logo.png' },
    { name: 'Tech Mahindra', logo: 'https://logos-world.net/wp-content/uploads/2020/06/Tech-Mahindra-Logo.png' },
    { name: 'Capgemini', logo: 'https://logos-world.net/wp-content/uploads/2020/06/Capgemini-Logo.png' }
  ];

  const placementStats = [
    { metric: '95%', label: 'Placement Rate', icon: TrendingUp },
    { metric: '₹8.5L', label: 'Average Package', icon: Award },
    { metric: '500+', label: 'Students Placed', icon: Users },
    { metric: '50+', label: 'Hiring Partners', icon: Building }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Success Stories</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Real students, real transformations, real career growth
          </p>
        </div>
      </section>

      {/* Live Placement Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Placement Statistics</h2>
            <p className="text-xl text-gray-600">Numbers that speak for themselves</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {placementStats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.metric}</h3>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Placements Ticker */}
      <section className="py-8 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">🎉 Recent Placements (Last 30 Days)</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentPlacements.map((placement, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h4 className="font-bold text-lg">{placement.name}</h4>
                <p className="text-sm opacity-90">{placement.course}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-yellow-300">{placement.package}</span>
                  <span className="text-sm">{placement.days} days ago</span>
                </div>
                <div className="flex items-center mt-1 text-sm opacity-80">
                  <Building className="w-4 h-4 mr-1" />
                  {placement.company}
                  <MapPin className="w-4 h-4 ml-2 mr-1" />
                  {placement.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Career Transformation Stories</h2>
            <p className="text-xl text-gray-600">See how our students transformed their careers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img src={story.image} alt={story.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                      <p className="text-blue-600 font-semibold">{story.course}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-red-50 to-green-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Before</p>
                        <p className="text-lg font-bold text-red-600">{story.beforeSalary}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-600" />
                      <div className="text-center">
                        <p className="text-sm text-gray-600">After</p>
                        <p className="text-lg font-bold text-green-600">{story.afterSalary}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Building className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="font-semibold">{story.company}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <span>Completed in {story.duration}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 italic mb-4">"{story.story}"</p>
                  
                  <a href={story.linkedin} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View LinkedIn Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Partners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Hiring Partners</h2>
            <p className="text-xl text-gray-600">Top companies that hire our students</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {hiringPartners.map((company, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="w-full h-16 object-contain mx-auto mb-3"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg items-center justify-center mb-3 hidden">
                  <span className="text-white font-bold text-sm">{company.name.substring(0, 3)}</span>
                </div>
                <p className="font-semibold text-gray-900 text-center text-sm">{company.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Write Your Success Story?</h2>
          <p className="text-xl mb-8 opacity-90">Join 500+ students who transformed their careers with us</p>
          <a
            href="/student-registration"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <span>Start Your Journey</span>
            <TrendingUp className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;