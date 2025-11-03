import React from 'react';
import { Award, Shield, CheckCircle, Star, Building, Users } from 'lucide-react';

const Certifications = () => {
  const industryCertifications = [
    { name: 'AWS Certified Solutions Architect', provider: 'Amazon Web Services', logo: 'https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png', courses: ['Cloud Computing'] },
    { name: 'Google Cloud Professional', provider: 'Google Cloud', logo: 'https://logos-world.net/wp-content/uploads/2021/09/Google-Cloud-Logo.png', courses: ['Cloud Computing'] },
    { name: 'Microsoft Azure Fundamentals', provider: 'Microsoft', logo: 'https://logos-world.net/wp-content/uploads/2020/06/Microsoft-Logo.png', courses: ['Cloud Computing'] },
    { name: 'Meta Frontend Developer', provider: 'Meta (Facebook)', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Facebook-Logo.png', courses: ['Full Stack Development'] },
    { name: 'Google Data Analytics', provider: 'Google', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png', courses: ['Data Science'] },
    { name: 'IBM Data Science Professional', provider: 'IBM', logo: 'https://logos-world.net/wp-content/uploads/2020/09/IBM-Logo.png', courses: ['Data Science'] }
  ];

  const instituteAccreditations = [
    { name: 'ISO 9001:2015 Certified', description: 'Quality Management System certification for educational excellence', icon: Shield },
    { name: 'NASSCOM Member', description: 'Recognized member of National Association of Software and Service Companies', icon: Building },
    { name: 'Skill India Partner', description: 'Official partner for government skill development initiatives', icon: Users },
    { name: 'AICTE Approved', description: 'All India Council for Technical Education recognition', icon: Award }
  ];

  const partnerships = [
    { name: 'TCS Partnership', type: 'Placement Partner', description: 'Direct placement opportunities for top performers' },
    { name: 'Infosys Collaboration', type: 'Training Partner', description: 'Industry-aligned curriculum development' },
    { name: 'Microsoft Education', type: 'Technology Partner', description: 'Access to latest Microsoft technologies and tools' },
    { name: 'AWS Academy', type: 'Cloud Partner', description: 'Official AWS training and certification center' }
  ];

  const qualityStandards = [
    { standard: 'Student Success Rate', metric: '95%', description: 'Course completion and placement success' },
    { standard: 'Industry Relevance', metric: '100%', description: 'Curriculum updated with latest industry trends' },
    { standard: 'Faculty Expertise', metric: '8+ Years', description: 'Average industry experience of faculty' },
    { standard: 'Student Satisfaction', metric: '4.9/5', description: 'Average rating from student feedback' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Certifications & Accreditations</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Recognized excellence in technical education and industry partnerships
          </p>
        </div>
      </section>

      {/* Industry Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industry Certifications Offered</h2>
            <p className="text-xl text-gray-600">Get certified by top tech companies upon course completion</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryCertifications.map((cert, idx) => (
              <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-lg transition-all">
                <div className="text-center mb-4">
                  <img src={cert.logo} alt={cert.provider} className="w-16 h-16 object-contain mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-gray-900">{cert.name}</h3>
                  <p className="text-blue-600 font-semibold">{cert.provider}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Available in:</p>
                  {cert.courses.map((course, i) => (
                    <span key={i} className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institute Accreditations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Institute Accreditations</h2>
            <p className="text-xl text-gray-600">Recognized by leading educational and industry bodies</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instituteAccreditations.map((accred, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <accred.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{accred.name}</h3>
                <p className="text-gray-600 text-sm">{accred.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Certificates */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Partnership Certificates</h2>
            <p className="text-xl text-gray-600">Strategic partnerships with industry leaders</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {partnerships.map((partner, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
                    <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm mt-2">
                      {partner.type}
                    </span>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-700">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance Standards */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Quality Assurance Standards</h2>
            <p className="text-xl opacity-90">Maintaining excellence in every aspect of education</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {qualityStandards.map((standard, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-yellow-400" />
                </div>
                <h3 className="text-3xl font-bold mb-2">{standard.metric}</h3>
                <h4 className="text-lg font-semibold mb-2">{standard.standard}</h4>
                <p className="opacity-90 text-sm">{standard.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Certified?</h2>
          <p className="text-xl text-gray-600 mb-8">Join our certified programs and boost your career prospects</p>
          <a
            href="/student-registration"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <Award className="w-5 h-5" />
            <span>Enroll Now</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Certifications;