import React, { useState } from 'react';
import { DollarSign, Calendar, CreditCard, Calculator, CheckCircle, Clock, Users, Award } from 'lucide-react';
import { courses } from '../data/courses';

const Admissions = () => {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [loanAmount, setLoanAmount] = useState(selectedCourse?.fee.replace('₹', '').replace(',', '') || '45000');
  const [tenure, setTenure] = useState(12);

  const calculateEMI = (principal, rate, months) => {
    const monthlyRate = rate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const paymentPlans = [
    { name: 'Full Payment', discount: '10%', description: 'Pay full amount upfront and save 10%', icon: DollarSign },
    { name: '3 Months EMI', interest: '0%', description: 'No interest for 3 months installment', icon: Calendar },
    { name: '6 Months EMI', interest: '5%', description: 'Low interest rate for 6 months', icon: CreditCard },
    { name: '12 Months EMI', interest: '8%', description: 'Extended payment period with competitive rates', icon: Calculator }
  ];

  const scholarships = [
    { name: 'Merit Scholarship', eligibility: '85%+ in graduation', benefit: 'Up to 30% fee waiver', icon: Award },
    { name: 'Early Bird Discount', eligibility: 'Register 30 days before batch', benefit: '15% discount', icon: Clock },
    { name: 'Referral Bonus', eligibility: 'Refer a friend who enrolls', benefit: '₹5,000 cashback', icon: Users },
    { name: 'Women in Tech', eligibility: 'Female candidates', benefit: '20% fee reduction', icon: CheckCircle }
  ];

  const admissionProcess = [
    { step: 1, title: 'Online Registration', description: 'Fill the registration form with your details' },
    { step: 2, title: 'Document Verification', description: 'Submit required documents for verification' },
    { step: 3, title: 'Counseling Session', description: 'Free career counseling and course guidance' },
    { step: 4, title: 'Fee Payment', description: 'Choose payment plan and complete fee payment' },
    { step: 5, title: 'Batch Allocation', description: 'Get assigned to your preferred batch timing' }
  ];

  const importantDates = [
    { event: 'Early Bird Registration', date: 'Jan 15 - Feb 15, 2024', status: 'Open' },
    { event: 'Regular Admission', date: 'Feb 16 - Mar 30, 2024', status: 'Open' },
    { event: 'Late Admission', date: 'Apr 1 - Apr 15, 2024', status: 'Upcoming' },
    { event: 'Batch Start Date', date: 'Every Monday', status: 'Rolling' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Admissions & Fees</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Transparent pricing, flexible payment options, and scholarship opportunities
          </p>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Course Fee Structure</h2>
            <p className="text-xl text-gray-600">Complete breakdown of fees for all courses</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-transparent hover:border-blue-500 transition-all">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-blue-600">{course.fee}</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {course.duration}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Course Fee:</span>
                    <span className="font-semibold">{course.fee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Registration:</span>
                    <span className="font-semibold">₹2,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Materials:</span>
                    <span className="font-semibold">₹1,500</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">₹{parseInt(course.fee.replace('₹', '').replace(',', '')) + 3500}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setLoanAmount(course.fee.replace('₹', '').replace(',', ''));
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Calculate EMI
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">EMI Calculator</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                  <select
                    value={selectedCourse?.id || ''}
                    onChange={(e) => {
                      const course = courses.find(c => c.id === parseInt(e.target.value));
                      setSelectedCourse(course);
                      setLoanAmount(course.fee.replace('₹', '').replace(',', ''));
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹)</label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tenure (Months)</label>
                  <select
                    value={tenure}
                    onChange={(e) => setTenure(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value={3}>3 Months (0% Interest)</option>
                    <option value={6}>6 Months (5% Interest)</option>
                    <option value={12}>12 Months (8% Interest)</option>
                  </select>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">EMI Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Principal Amount:</span>
                    <span className="font-semibold">₹{parseInt(loanAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-semibold">{tenure === 3 ? '0%' : tenure === 6 ? '5%' : '8%'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tenure:</span>
                    <span className="font-semibold">{tenure} months</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Monthly EMI:</span>
                    <span className="text-blue-600">
                      ₹{calculateEMI(parseInt(loanAmount), tenure === 3 ? 0 : tenure === 6 ? 5 : 8, tenure).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Flexible Payment Plans</h2>
            <p className="text-xl text-gray-600">Choose the payment option that works best for you</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentPlans.map((plan, idx) => (
              <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-lg transition-all">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  {plan.discount && <span className="text-green-600 font-semibold">{plan.discount} OFF</span>}
                  {plan.interest && <span className="text-blue-600 font-semibold">{plan.interest} Interest</span>}
                </div>
                <p className="text-gray-600 text-sm text-center">{plan.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Scholarship Programs</h2>
            <p className="text-xl text-gray-600">Financial assistance for deserving candidates</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scholarships.map((scholarship, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <scholarship.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{scholarship.name}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600"><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                  <p className="text-sm font-semibold text-green-600">{scholarship.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Admission Process</h2>
            <p className="text-xl text-gray-600">Simple 5-step process to join Vspaze Institute</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            <div className="space-y-8">
              {admissionProcess.map((step, idx) => (
                <div key={idx} className={`flex items-center ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Important Dates</h2>
            <p className="text-xl text-gray-600">Key admission dates and deadlines</p>
          </div>
          <div className="space-y-4">
            {importantDates.map((date, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{date.event}</h3>
                  <p className="text-gray-600">{date.date}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  date.status === 'Open' ? 'bg-green-100 text-green-800' :
                  date.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {date.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Apply now and secure your seat in the next batch</p>
          <a
            href="/student-registration"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Apply Now</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Admissions;