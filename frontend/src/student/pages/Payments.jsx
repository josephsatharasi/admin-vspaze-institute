import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import api from '../../utils/api';

const Payments = () => {
  const [studentData, setStudentData] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [showGateway, setShowGateway] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, paymentsRes] = await Promise.all([
        api.get('/student/profile'),
        api.get('/student/payments')
      ]);
      setStudentData(profileRes.data.student);
      setPaymentHistory(paymentsRes.data.payments || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePayNow = () => {
    if (!paymentAmount || paymentAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (parseFloat(paymentAmount) > studentData.dueAmount) {
      alert('Amount cannot exceed due amount');
      return;
    }
    setShowPaymentModal(false);
    setShowGateway(true);
  };

  const handlePaymentSuccess = async () => {
    setProcessing(true);
    
    try {
      const amount = parseFloat(paymentAmount);
      const response = await api.post('/student/payments', {
        amount,
        method: 'Dummy Gateway',
        transactionId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase()
      });

      if (response.data.success) {
        alert('Payment successful!');
        await fetchData();
        setShowGateway(false);
        setPaymentAmount('');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (!studentData) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">My Payments</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Fee</p>
          <p className="text-3xl font-bold text-gray-900">₹{studentData.totalFee || 0}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Paid Amount</p>
          <p className="text-3xl font-bold text-green-600">₹{studentData.paidAmount || 0}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Due Amount</p>
          <p className="text-3xl font-bold text-red-600">₹{studentData.dueAmount || 0}</p>
        </div>
      </div>

      {studentData.dueAmount > 0 && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Payment Pending</h3>
              <p className="text-gray-600">You have ₹{studentData.dueAmount} pending. Please make payment to continue.</p>
            </div>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <CreditCard className="w-5 h-5" />
              <span>Pay Now</span>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
        {paymentHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>No payment history yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {paymentHistory.map((payment) => (
              <div key={payment._id || payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">₹{payment.amount}</p>
                    <p className="text-sm text-gray-600">{new Date(payment.paymentDate || payment.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">TXN: {payment.transactionId}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Amount Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enter Payment Amount</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter amount"
                  max={studentData.dueAmount}
                />
                <p className="text-sm text-gray-600 mt-2">Due Amount: ₹{studentData.dueAmount}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handlePayNow}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Proceed to Pay
                </button>
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setPaymentAmount('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dummy Payment Gateway */}
      {showGateway && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-lg">
              <h3 className="text-xl font-bold text-white">Dummy Payment Gateway</h3>
              <p className="text-blue-100 text-sm">Secure Payment Portal</p>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <span className="text-gray-600">Amount to Pay</span>
                  <span className="text-2xl font-bold text-gray-900">₹{paymentAmount}</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      defaultValue="4111 1111 1111 1111"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      disabled={processing}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                      <input
                        type="text"
                        defaultValue="12/25"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        disabled={processing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        defaultValue="123"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        disabled={processing}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handlePaymentSuccess}
                  disabled={processing}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold disabled:bg-gray-400"
                >
                  {processing ? 'Processing...' : 'Pay Now'}
                </button>
                <button
                  onClick={() => {
                    setShowGateway(false);
                    setPaymentAmount('');
                  }}
                  disabled={processing}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 disabled:bg-gray-300"
                >
                  Cancel
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                🔒 This is a dummy payment gateway for testing purposes
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
