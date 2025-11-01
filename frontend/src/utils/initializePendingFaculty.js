export const initializePendingFaculty = () => {
  const existing = localStorage.getItem('pending_faculty');
  if (!existing || JSON.parse(existing).length === 0) {
    const dummyPending = [
      {
        id: Date.now() + 1,
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@example.com',
        phone: '9876543210',
        specialization: 'Machine Learning',
        experience: '8 years',
        qualification: 'PhD in Computer Science',
        registeredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: Date.now() + 2,
        name: 'Prof. Anita Desai',
        email: 'anita.desai@example.com',
        phone: '9123456789',
        specialization: 'Web Development',
        experience: '6 years',
        qualification: 'Masters in Software Engineering',
        registeredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: Date.now() + 3,
        name: 'Dr. Vikram Singh',
        email: 'vikram.singh@example.com',
        phone: '9988776655',
        specialization: 'Cloud Computing',
        experience: '10 years',
        qualification: 'PhD in Cloud Architecture',
        registeredAt: new Date().toISOString()
      }
    ];
    localStorage.setItem('pending_faculty', JSON.stringify(dummyPending));
  }
};
