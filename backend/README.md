# Vspaze Institute - Backend API

Production-ready MERN stack backend for Vspaze Institute Management System.

## 🚀 Features

- **Secure Authentication** - JWT-based auth with bcrypt password hashing
- **Role-Based Access Control** - Admin, Student, Faculty roles
- **RESTful API** - Clean and organized endpoints
- **MongoDB Database** - Scalable NoSQL database
- **Error Handling** - Comprehensive error handling middleware
- **Security** - Helmet, CORS, Rate Limiting
- **Validation** - Input validation and sanitization

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── adminController.js   # Admin operations
│   │   ├── studentController.js # Student operations
│   │   ├── courseController.js  # Course management
│   │   └── batchController.js   # Batch management
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── errorHandler.js      # Error handling
│   ├── models/
│   │   ├── admin/Admin.js
│   │   ├── student/Student.js
│   │   ├── faculty/Faculty.js
│   │   ├── course/Course.js
│   │   ├── batch/Batch.js
│   │   ├── assignment/Assignment.js
│   │   ├── test/Test.js
│   │   ├── payment/Payment.js
│   │   ├── attendance/Attendance.js
│   │   └── job/Job.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── courseRoutes.js
│   │   └── batchRoutes.js
│   ├── utils/
│   │   ├── jwt.js               # JWT utilities
│   │   └── seedAdmin.js         # Admin seeder
│   └── server.js                # Main server file
├── .env                         # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment**
Create `.env` file (already created) and update if needed:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

3. **Seed Admin Users**
```bash
npm run seed:admin
```

4. **Start Development Server**
```bash
npm run dev
```

5. **Start Production Server**
```bash
npm start
```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/admin/login` | Admin login | Public |
| POST | `/student/login` | Student login | Public |
| POST | `/student/register` | Student registration | Public |
| POST | `/faculty/register` | Faculty application | Public |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/dashboard/stats` | Get dashboard statistics | Admin |
| GET | `/students/pending` | Get pending students | Admin |
| PUT | `/students/approve/:id` | Approve student | Admin |
| GET | `/faculty/pending` | Get pending faculty | Admin |
| PUT | `/faculty/approve/:id` | Approve faculty | Admin |
| GET | `/students` | Get all students | Admin |
| PUT | `/students/:id` | Update student | Admin |
| DELETE | `/students/:id` | Delete student | Admin |
| GET | `/faculty` | Get all faculty | Admin |
| PUT | `/faculty/:id` | Update faculty | Admin |
| DELETE | `/faculty/:id` | Delete faculty | Admin |
| POST | `/payments` | Record payment | Admin |
| GET | `/payments` | Get all payments | Admin |

### Course Routes (`/api/courses`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all courses | Public |
| GET | `/:id` | Get single course | Public |
| POST | `/` | Create course | Admin |
| PUT | `/:id` | Update course | Admin |
| DELETE | `/:id` | Delete course | Admin |

### Batch Routes (`/api/batches`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all batches | Admin |
| POST | `/` | Create batch | Admin |
| PUT | `/:id` | Update batch | Admin |
| DELETE | `/:id` | Delete batch | Admin |

### Student Routes (`/api/student`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/profile` | Get student profile | Student |
| PUT | `/profile` | Update profile | Student |
| GET | `/courses` | Get enrolled courses | Student |
| GET | `/assignments` | Get assignments | Student |
| POST | `/assignments/submit` | Submit assignment | Student |
| GET | `/tests` | Get tests | Student |
| POST | `/tests/submit` | Submit test | Student |
| GET | `/payments` | Get payment history | Student |
| GET | `/jobs` | Get all jobs | Student |
| POST | `/jobs/apply` | Apply for job | Student |
| GET | `/jobs/applications` | Get my applications | Student |

## 🔐 Authentication

All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

## 📝 Request/Response Examples

### Admin Login
**Request:**
```json
POST /api/auth/admin/login
{
  "email": "admin@vspaze.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "Admin",
    "email": "admin@vspaze.com",
    "role": "admin"
  }
}
```

### Student Registration
**Request:**
```json
POST /api/auth/student/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "course": "Full Stack Development",
  "address": "123 Main St"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration submitted. Admin will approve soon.",
  "studentId": "60d5ec49f1b2c72b8c8e4f1b"
}
```

### Approve Student
**Request:**
```json
PUT /api/admin/students/approve/:id
Headers: Authorization: Bearer <admin_token>
{
  "password": "student123",
  "totalFee": 50000,
  "enrolledCourses": ["60d5ec49f1b2c72b8c8e4f1c"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student approved successfully",
  "student": { ... }
}
```

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Rate Limiting** - 100 requests per 15 minutes
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Input Validation** - Request validation

## 🗄️ Database Models

### Student Schema
- name, email, password (hashed)
- phone, address
- enrolledCourses (ref: Course)
- batch (ref: Batch)
- totalFee, paidAmount, dueAmount
- status: pending/active/inactive
- timestamps

### Faculty Schema
- name, email, password (hashed)
- phone, specialization, qualification
- experience, bio, resume
- assignedCourses (ref: Course)
- salary, status
- timestamps

### Course Schema
- name, description, duration, fee
- subjects, syllabus
- enrolledStudents count, batches count
- status: active/inactive
- timestamps

### Batch Schema
- name, course (ref: Course)
- faculty (ref: Faculty array)
- students (ref: Student array)
- startDate, endDate, schedule
- status: upcoming/active/completed
- maxStudents
- timestamps

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_secret_key
FRONTEND_URL=https://your-frontend-domain.com
```

### Deploy to Heroku/Railway/Render
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

## 📞 Support

For issues or questions, contact: support@vspaze.com

## 📄 License

MIT License - Vspaze Institute © 2024
