export const initializeDummyActivity = () => {
  const existing = localStorage.getItem('login_activities');
  if (!existing || JSON.parse(existing).length === 0) {
    const dummyData = [
      { userType: 'teacher', userId: 'T001', userName: 'Dr. Sarah Johnson', action: 'login', timestamp: new Date('2024-01-15T09:00:00').toISOString(), duration: '8h 30m' },
      { userType: 'teacher', userId: 'T001', userName: 'Dr. Sarah Johnson', action: 'logout', timestamp: new Date('2024-01-15T17:30:00').toISOString(), duration: null },
      { userType: 'teacher', userId: 'T002', userName: 'Prof. Michael Chen', action: 'login', timestamp: new Date('2024-01-15T08:45:00').toISOString(), duration: '9h 15m' },
      { userType: 'teacher', userId: 'T002', userName: 'Prof. Michael Chen', action: 'logout', timestamp: new Date('2024-01-15T18:00:00').toISOString(), duration: null },
      { userType: 'teacher', userId: 'T003', userName: 'Dr. Emily Davis', action: 'login', timestamp: new Date('2024-01-15T10:00:00').toISOString(), duration: '7h 0m' },
      { userType: 'teacher', userId: 'T003', userName: 'Dr. Emily Davis', action: 'logout', timestamp: new Date('2024-01-15T17:00:00').toISOString(), duration: null },
      { userType: 'teacher', userId: 'T001', userName: 'Dr. Sarah Johnson', action: 'login', timestamp: new Date('2024-01-16T09:15:00').toISOString(), duration: '8h 0m' },
      { userType: 'teacher', userId: 'T001', userName: 'Dr. Sarah Johnson', action: 'logout', timestamp: new Date('2024-01-16T17:15:00').toISOString(), duration: null },
      { userType: 'student', userId: 'S001', userName: 'John Doe', action: 'login', timestamp: new Date('2024-01-15T10:30:00').toISOString(), duration: '5h 30m' },
      { userType: 'student', userId: 'S001', userName: 'John Doe', action: 'logout', timestamp: new Date('2024-01-15T16:00:00').toISOString(), duration: null },
      { userType: 'student', userId: 'S002', userName: 'Sarah Wilson', action: 'login', timestamp: new Date('2024-01-15T11:00:00').toISOString(), duration: '6h 0m' },
      { userType: 'student', userId: 'S002', userName: 'Sarah Wilson', action: 'logout', timestamp: new Date('2024-01-15T17:00:00').toISOString(), duration: null },
      { userType: 'student', userId: 'S003', userName: 'Mike Johnson', action: 'login', timestamp: new Date('2024-01-15T09:30:00').toISOString(), duration: '4h 30m' },
      { userType: 'student', userId: 'S003', userName: 'Mike Johnson', action: 'logout', timestamp: new Date('2024-01-15T14:00:00').toISOString(), duration: null },
      { userType: 'student', userId: 'S001', userName: 'John Doe', action: 'login', timestamp: new Date('2024-01-16T10:00:00').toISOString(), duration: '6h 15m' },
      { userType: 'student', userId: 'S001', userName: 'John Doe', action: 'logout', timestamp: new Date('2024-01-16T16:15:00').toISOString(), duration: null },
      { userType: 'teacher', userId: 'T002', userName: 'Prof. Michael Chen', action: 'login', timestamp: new Date().toISOString(), duration: null }
    ];
    localStorage.setItem('login_activities', JSON.stringify(dummyData));
  }
};
