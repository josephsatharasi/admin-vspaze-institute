import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, BookOpen, TrendingUp, CheckCircle, Star, Code, Database, Megaphone, Cloud, Palette, Briefcase, DollarSign, Clock as ClockIcon, Target, Play, Zap, Shield, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { courses } from '../data/courses';
import { faculty } from '../data/faculty';
import { testimonials } from '../data/testimonials';

const TestimonialCarousel = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <div className="group bg-slate-800 border border-cyan-500/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all max-w-4xl mx-auto">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-cyan-100 text-lg mb-6 italic leading-relaxed">"{testimonial.review}"</p>
                <div className="flex items-center justify-between pt-6 border-t border-cyan-500/20">
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-cyan-300">{testimonial.course}</p>
                  </div>
                  <span className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-semibold border border-cyan-400/30">{testimonial.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, idx) => (
          <button key={idx} onClick={() => setCurrent(idx)} className={`w-3 h-3 rounded-full transition-all ${ idx === current ? 'bg-cyan-500 w-8' : 'bg-cyan-500/30' }`} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="bg-slate-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 py-12 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl animate-blob top-0 -left-20"></div>
          <div className="absolute w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-blob animation-delay-2000 top-0 right-0"></div>
          <div className="absolute w-96 h-96 bg-teal-400/30 rounded-full blur-3xl animate-blob animation-delay-4000 bottom-0 left-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left animate-fade-in-up">
              <div className="inline-block mb-4 px-6 py-2 bg-cyan-500/20 backdrop-blur-sm rounded-full text-cyan-300 font-semibold animate-pulse-glow border border-cyan-400/30">
                💻 Engineering Excellence Online
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                Master Tech Skills
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-300 bg-clip-text text-transparent animate-typing text-3xl sm:text-4xl md:text-5xl">
                  Build Your Future
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-cyan-100 mb-10 leading-relaxed">
                Learn Full Stack, Data Science, Cloud & AI from industry experts. 100% online with live coding sessions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start items-center">
                <Link to="/student-registration" className="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 flex items-center space-x-3 w-full sm:w-auto justify-center">
                  <span>Start Learning Free</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link to="/courses" className="group bg-transparent border-3 border-cyan-400 text-cyan-300 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold hover:bg-cyan-400 hover:text-slate-900 transition-all flex items-center space-x-3 w-full sm:w-auto justify-center">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Watch Demo</span>
                </Link>
              </div>
              <div className="mt-12 flex justify-center md:justify-start items-center space-x-4 sm:space-x-8 text-white">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold">500+</div>
                  <div className="text-xs sm:text-sm opacity-80">Students</div>
                </div>
                <div className="w-px h-8 sm:h-12 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold">95%</div>
                  <div className="text-xs sm:text-sm opacity-80">Placement</div>
                </div>
                <div className="w-px h-8 sm:h-12 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold">4.9★</div>
                  <div className="text-xs sm:text-sm opacity-80">Rating</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block animate-fade-in -mt-16">
              <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80" alt="Coding and programming" className="rounded-3xl shadow-2xl shadow-cyan-500/20 transform hover:scale-105 transition-all border border-cyan-500/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, count: '500+', label: 'Students Enrolled', color: 'cyan' },
              { icon: Award, count: '25+', label: 'Expert Faculty', color: 'blue' },
              { icon: BookOpen, count: '15+', label: 'Tech Courses', color: 'teal' },
              { icon: TrendingUp, count: '95%', label: 'Placement Rate', color: 'emerald' }
            ].map((stat, idx) => {
              const bgClasses = {
                cyan: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
                blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
                teal: 'bg-gradient-to-br from-teal-400 to-teal-600',
                emerald: 'bg-gradient-to-br from-emerald-400 to-emerald-600'
              };
              return (
                <div key={idx} className="text-center">
                  <div className="w-20 h-20 bg-transparent rounded-2xl flex items-center justify-center mx-auto mb-4 border border-cyan-400 shadow-lg shadow-cyan-400/50 hover:scale-110 transition-transform">
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">{stat.count}</h3>
                  <p className="text-cyan-100 font-semibold">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-cyan-500/20 text-cyan-300 rounded-full font-semibold mb-4 border border-cyan-400/30">
              🚀 Trending Tech Courses
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">Master Engineering Skills</h2>
            <p className="text-lg sm:text-xl text-cyan-100">Industry-ready courses for aspiring engineers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courses.slice(0, 6).map((course, idx) => (
              <div key={course.id} className="group bg-slate-800 border border-cyan-500/20 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-3 overflow-hidden">
                <div className="relative bg-gradient-to-br from-cyan-600 via-blue-600 to-slate-700 p-8 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                  <div className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {course.iconType === 'code' && <Code className="w-10 h-10 text-white" />}
                    {course.iconType === 'database' && <Database className="w-10 h-10 text-white" />}
                    {course.iconType === 'megaphone' && <Megaphone className="w-10 h-10 text-white" />}
                    {course.iconType === 'cloud' && <Cloud className="w-10 h-10 text-white" />}
                    {course.iconType === 'palette' && <Palette className="w-10 h-10 text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold text-white relative">{course.name}</h3>
                </div>
                <div className="p-8">
                  <p className="text-cyan-100 mb-6 line-clamp-2">{course.description}</p>
                  <div className="flex justify-between items-center mb-6 pb-6 border-b border-cyan-500/20">
                    <span className="flex items-center text-cyan-400 font-semibold">
                      <ClockIcon className="w-5 h-5 mr-2" /> {course.duration}
                    </span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{course.fee}</span>
                  </div>
                  <Link to={`/course/${course.id}`} className="block text-center bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-cyan-500/30 transition-all group-hover:scale-105">
                    Explore Course →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/courses" className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105">
              <span>View All Courses</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">Why Choose Vspaze?</h2>
            <p className="text-lg sm:text-xl text-cyan-100">Learn from industry experts with hands-on coding experience</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Code, title: 'Live Coding Sessions', desc: 'Learn by coding with expert mentors in real-time', gradient: 'from-cyan-500 to-blue-500' },
              { icon: Briefcase, title: 'Tech Placements', desc: '95% placement in top tech companies & startups', gradient: 'from-emerald-500 to-teal-500' },
              { icon: Target, title: 'Real Projects', desc: 'Build production-ready apps and deploy live', gradient: 'from-blue-500 to-indigo-500' },
              { icon: Video, title: 'Online Classes', desc: 'Live interactive sessions with recorded lectures', gradient: 'from-violet-500 to-purple-500' },
              { icon: Zap, title: 'Latest Tech Stack', desc: 'Learn cutting-edge technologies used in industry', gradient: 'from-orange-500 to-amber-500' },
              { icon: Award, title: 'Certifications', desc: 'Industry-recognized certificates for your resume', gradient: 'from-pink-500 to-rose-500' }
            ].map((item, idx) => (
              <div key={idx} className="group relative bg-slate-800 border border-cyan-500/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-2 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-cyan-100 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Highlights */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-2 bg-cyan-500/20 text-cyan-300 rounded-full font-semibold mb-4 border border-cyan-400/30">
              👨‍💻 Expert Tech Mentors
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">Learn From Industry Experts</h2>
            <p className="text-lg sm:text-xl text-cyan-100">Senior engineers from top tech companies</p>
          </div>
          <div className="mb-16 hidden md:block">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" alt="Tech team collaboration" className="rounded-3xl shadow-2xl shadow-cyan-500/20 mx-auto max-w-4xl border border-cyan-500/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {faculty.map((member, idx) => (
              <div key={member.id} className="group bg-slate-800 border border-cyan-500/20 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-3 overflow-hidden">
                <div className="bg-gradient-to-br from-cyan-600 via-blue-600 to-slate-700 p-8 text-center">
                  <div className="w-28 h-28 rounded-full mx-auto mb-4 shadow-2xl group-hover:scale-110 transition-transform border-2 border-cyan-400 overflow-hidden">
                    <img src={`https://randomuser.me/api/portraits/${idx % 2 === 0 ? 'men' : 'women'}/${idx + 10}.jpg`} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-cyan-400 font-semibold mb-2">{member.specialization}</p>
                  <p className="text-cyan-100 text-sm mb-2">{member.qualification}</p>
                  <p className="text-cyan-200 text-sm">{member.experience} Experience</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/faculty" className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105">
              <span>Meet All Faculty</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-2 bg-emerald-500/20 text-emerald-300 rounded-full font-semibold mb-4 border border-emerald-400/30">
              ⭐ Success Stories
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">What Our Students Say</h2>
            <p className="text-lg sm:text-xl text-cyan-100">Join thousands of successful alumni</p>
          </div>
          <div className="mb-16 hidden md:block">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" alt="Happy engineering students" className="rounded-3xl shadow-2xl shadow-cyan-500/20 mx-auto max-w-4xl border border-cyan-500/20" />
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-cyan-600 via-blue-600 to-slate-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-0 left-0 animate-blob"></div>
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl bottom-0 right-0 animate-blob animation-delay-2000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">Ready to Start Your Tech Journey?</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-10 opacity-90">Join 500+ engineering students who transformed their careers</p>
          <Link to="/student-registration" className="inline-flex items-center space-x-3 bg-white text-blue-600 px-12 py-6 rounded-full text-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105">
            <span>Enroll Now - It's Free</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-white mt-6 opacity-75">✓ No Credit Card Required  ✓ Start Coding Today</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
