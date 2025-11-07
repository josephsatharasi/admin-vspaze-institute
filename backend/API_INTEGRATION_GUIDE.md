# 🔌 Frontend Integration Guide

## How to Connect React Frontend with Backend API

### 1. Install Axios in Frontend
```bash
cd frontend
npm install axios
```

### 2. Create API Configuration

Create `frontend/src/utils/api.js`:
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 3. Update Login Components

#### Admin Login (`frontend/src/pages/AdminLogin.jsx`)
```javascript
import api from '../utils/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  
  try {
    const response = await api.post('/auth/admin/login', {
      email: formData.email,
      password: formData.password
    });
    
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('vspaze_auth', JSON.stringify({
        isAuthenticated: true,
        user: response.data.user
      }));
      navigate('/admin');
    }
  } catch (error) {
    setError(error.response?.data?.message || 'Login failed');
  }
};
```

#### Student Login (`frontend/src/pages/StudentLogin.jsx`)
```javascript
import api from '../utils/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  
  try {
    const response = await api.post('/auth/student/login', {
      email: formData.email,
      password: formData.password
    });
    
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('student_auth', JSON.stringify({
        isAuthenticated: true,
        student: response.data.user
      }));
      navigate('/student');
    }
  } catch (error) {
    setError(error.response?.data?.message || 'Login failed');
  }
};
```

### 4. Update Registration Components

#### Student Registration
```javascript
import api from '../utils/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await api.post('/auth/student/register', formData);
    
    if (response.data.success) {
      setSubmitted(true);
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Registration failed');
  }
};
```

### 5. Admin Dashboard Integration

#### Get Dashboard Stats
```javascript
import { useEffect, useState } from 'react';
import api from '../utils/api';

const DashboardLanding = () => {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/dashboard/stats');
        setStats(response.data.stats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchStats();
  }, []);
  
  return (
    <div>
      {stats && (
        <>
          <StatCard title="Total Students" value={stats.totalStudents} />
          <StatCard title="Total Faculty" value={stats.totalFaculty} />
          <StatCard title="Active Courses" value={stats.totalCourses} />
          <StatCard title="Active Batches" value={stats.totalBatches} />
        </>
      )}
    </div>
  );
};
```

#### Get Pending Students
```javascript
const PendingStudents = () => {
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    const fetchPendingStudents = async () => {
      try {
        const response = await api.get('/admin/students/pending');
        setStudents(response.data.students);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchPendingStudents();
  }, []);
  
  const handleApprove = async (studentId) => {
    try {
      const response = await api.put(`/admin/students/approve/${studentId}`, {
        password: password,
        totalFee: parseFloat(courseFee),
        enrolledCourses: []
      });
      
      if (response.data.success) {
        alert('Student approved successfully!');
        // Refresh list
        setStudents(students.filter(s => s._id !== studentId));
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Approval failed');
    }
  };
  
  return (
    // Your JSX
  );
};
```

#### Student Management
```javascript
const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/admin/students');
        setStudents(response.data.students);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchStudents();
  }, []);
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/admin/students/${id}`);
        setStudents(students.filter(s => s._id !== id));
      } catch (error) {
        alert('Delete failed');
      }
    }
  };
  
  const handleUpdate = async (id, data) => {
    try {
      const response = await api.put(`/admin/students/${id}`, data);
      // Update local state
      setStudents(students.map(s => 
        s._id === id ? response.data.student : s
      ));
    } catch (error) {
      alert('Update failed');
    }
  };
  
  return (
    // Your JSX
  );
};
```

### 6. Course Management Integration

```javascript
const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchCourses();
  }, []);
  
  const handleAdd = async (courseData) => {
    try {
      const response = await api.post('/courses', courseData);
      setCourses([...courses, response.data.course]);
    } catch (error) {
      alert('Failed to create course');
    }
  };
  
  const handleUpdate = async (id, courseData) => {
    try {
      const response = await api.put(`/courses/${id}`, courseData);
      setCourses(courses.map(c => 
        c._id === id ? response.data.course : c
      ));
    } catch (error) {
      alert('Failed to update course');
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await api.delete(`/courses/${id}`);
      setCourses(courses.filter(c => c._id !== id));
    } catch (error) {
      alert('Failed to delete course');
    }
  };
  
  return (
    // Your JSX
  );
};
```

### 7. Student Portal Integration

#### Get Student Profile
```javascript
const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/student/profile');
        setProfile(response.data.student);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchProfile();
  }, []);
  
  return (
    // Display profile data
  );
};
```

#### Get My Courses
```javascript
const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/student/courses');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchCourses();
  }, []);
  
  return (
    // Display courses
  );
};
```

#### Get Assignments
```javascript
const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await api.get('/student/assignments');
        setAssignments(response.data.assignments);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchAssignments();
  }, []);
  
  const handleSubmit = async (assignmentId, files) => {
    try {
      await api.post('/student/assignments/submit', {
        assignmentId,
        files
      });
      alert('Assignment submitted successfully!');
    } catch (error) {
      alert('Submission failed');
    }
  };
  
  return (
    // Display assignments
  );
};
```

#### Get Jobs
```javascript
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/student/jobs');
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchJobs();
  }, []);
  
  const handleApply = async (jobId, resume, coverLetter) => {
    try {
      await api.post('/student/jobs/apply', {
        jobId,
        resume,
        coverLetter
      });
      alert('Application submitted!');
    } catch (error) {
      alert('Application failed');
    }
  };
  
  return (
    // Display jobs
  );
};
```

### 8. Payment Integration

```javascript
const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  
  const recordPayment = async (paymentData) => {
    try {
      const response = await api.post('/admin/payments', {
        studentId: paymentData.studentId,
        amount: paymentData.amount,
        paymentMethod: paymentData.paymentMethod,
        transactionId: paymentData.transactionId
      });
      
      if (response.data.success) {
        alert('Payment recorded successfully!');
        // Refresh payments list
      }
    } catch (error) {
      alert('Payment recording failed');
    }
  };
  
  return (
    // Your JSX
  );
};
```

### 9. Error Handling Best Practices

```javascript
// Create a custom hook for API calls
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const callApi = async (apiFunction) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiFunction();
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setLoading(false);
      throw err;
    }
  };
  
  return { callApi, loading, error };
};

// Usage
const MyComponent = () => {
  const { callApi, loading, error } = useApi();
  
  const fetchData = async () => {
    try {
      const data = await callApi(() => api.get('/endpoint'));
      // Handle data
    } catch (err) {
      // Error already set in state
    }
  };
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {/* Your content */}
    </div>
  );
};
```

### 10. Environment Configuration

Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Update `api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### 11. Production Deployment

For production, update:
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## 🎯 Complete Migration Checklist

- [ ] Install axios in frontend
- [ ] Create api.js utility file
- [ ] Update AdminLogin component
- [ ] Update StudentLogin component
- [ ] Update StudentRegistration component
- [ ] Update FacultyRegistration component
- [ ] Update DashboardLanding with API calls
- [ ] Update PendingStudents with API calls
- [ ] Update StudentManagement with API calls
- [ ] Update FacultyManagement with API calls
- [ ] Update CourseManagement with API calls
- [ ] Update BatchManagement with API calls
- [ ] Update PaymentManagement with API calls
- [ ] Update Student Profile with API calls
- [ ] Update MyCourses with API calls
- [ ] Update Assignments with API calls
- [ ] Update Tests with API calls
- [ ] Update Jobs with API calls
- [ ] Test all features end-to-end
- [ ] Handle loading states
- [ ] Handle error states
- [ ] Add success notifications

## 🚀 You're Ready!

Your backend is production-ready and fully documented. Start integrating with your React frontend!
