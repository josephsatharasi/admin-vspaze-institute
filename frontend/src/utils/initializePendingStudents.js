export const initializePendingStudents = () => {
  const existing = localStorage.getItem('pending_students');
  if (!existing || JSON.parse(existing).length === 0) {
    const dummyPending = [
      {
        id: Date.now() + 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        phone: '9876543210',
        course: 'Full Stack Development',
        batch: 'Morning Batch',
        address: '123 MG Road, Bangalore',
        registeredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: Date.now() + 2,
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        phone: '9123456789',
        course: 'Data Science',
        batch: 'Evening Batch',
        address: '456 Park Street, Mumbai',
        registeredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: Date.now() + 3,
        name: 'Amit Kumar',
        email: 'amit.kumar@example.com',
        phone: '9988776655',
        course: 'Digital Marketing',
        batch: 'Weekend Batch',
        address: '789 Nehru Place, Delhi',
        registeredAt: new Date().toISOString()
      },
      {
        id: Date.now() + 4,
        name: 'Sneha Reddy',
        email: 'sneha.reddy@example.com',
        phone: '9876512345',
        course: 'Python Programming',
        batch: 'Morning Batch',
        address: '321 Banjara Hills, Hyderabad',
        registeredAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
      }
    ];
    localStorage.setItem('pending_students', JSON.stringify(dummyPending));
  }
};
