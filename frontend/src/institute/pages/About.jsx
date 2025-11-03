import React from 'react';
import { Target, Eye, Award, Users, TrendingUp, Heart, Zap, Shield, Monitor, Video } from 'lucide-react';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">About Vspaze Institute</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            India's Leading Online Learning Platform - Empowering students since 2015
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                Founded in 2015, Vspaze Institute started with a vision to make quality education accessible to everyone through online learning. We bridge the gap between academic learning and industry requirements with our 100% online courses.
              </p>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                We've trained over 500+ students from across India who are now working in top companies like TCS, Infosys, Wipro, and many startups. Our success lies in our commitment to quality online education and personalized attention to each student.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, we offer 15+ industry-relevant online courses with live classes, recorded sessions, and hands-on projects taught by experienced professionals.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-xl text-center transform hover:scale-105 transition-transform">
                <h3 className="text-4xl font-bold text-blue-600 mb-2">500+</h3>
                <p className="text-gray-700">Online Students</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl text-center transform hover:scale-105 transition-transform">
                <h3 className="text-4xl font-bold text-purple-600 mb-2">25+</h3>
                <p className="text-gray-700">Expert Faculty</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl text-center transform hover:scale-105 transition-transform">
                <h3 className="text-4xl font-bold text-green-600 mb-2">15+</h3>
                <p className="text-gray-700">Online Courses</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl text-center transform hover:scale-105 transition-transform">
                <h3 className="text-4xl font-bold text-orange-600 mb-2">100%</h3>
                <p className="text-gray-700">Online Learning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To provide world-class online education that empowers students with practical skills and knowledge from anywhere in India, enabling them to excel in their careers and contribute meaningfully to society.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be India's leading online institute recognized for excellence in digital education, innovation in online teaching methodologies, and producing industry-ready professionals who shape the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Monitor, title: 'Accessibility', desc: 'Quality education accessible to everyone, everywhere', color: 'blue' },
              { icon: Heart, title: 'Integrity', desc: 'Honest and transparent in all our dealings', color: 'red' },
              { icon: Zap, title: 'Innovation', desc: 'Cutting-edge online learning technology', color: 'yellow' },
              { icon: Shield, title: 'Trust', desc: 'Building lasting relationships with students', color: 'green' }
            ].map((value, idx) => (
              <div key={idx} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all transform hover:-translate-y-2">
                <div className={`w-16 h-16 bg-${value.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className={`w-8 h-8 text-${value.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Students Choose Us</h2>
            <p className="text-xl opacity-90">What makes Vspaze Institute stand out</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Monitor, title: 'Live Online Classes', desc: 'Interactive live sessions with industry professionals' },
              { icon: TrendingUp, title: 'Career Growth', desc: '95% of our students get placed in top companies' },
              { icon: Video, title: 'Recorded Sessions', desc: 'Access recorded classes anytime for revision' },
              { icon: Zap, title: 'Hands-on Projects', desc: 'Real-world projects and practical assignments' },
              { icon: Heart, title: '24/7 Support', desc: 'Online doubt clearing and mentorship support' },
              { icon: Shield, title: 'Placement Assistance', desc: 'Dedicated online placement support' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all">
                <item.icon className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="opacity-90">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
