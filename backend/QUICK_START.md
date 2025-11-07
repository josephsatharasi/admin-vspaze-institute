# 🚀 Quick Start Guide - Vspaze Institute Backend

## ✅ Setup Complete!

Your backend is ready to use. Admin users have been created in the database.

## 🔑 Default Credentials

### Admin Login
- **Email:** admin@vspaze.com
- **Password:** admin123

### Super Admin Login
- **Email:** superadmin@vspaze.com
- **Password:** super123

## 🏃 Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server will run on: **http://localhost:5000**

## 🧪 Testing the API

### 1. Test Server Health
Open browser or Postman:
```
GET http://localhost:5000
```

Expected Response:
```json
{
  "success": true,
  "message": "Vspaze Institute API",
  "version": "1.0.0"
}
```

### 2. Test Admin Login
```
POST http://localhost:5000/api/auth/admin/login
Content-Type: application/json

{
  "email": "admin@vspaze.com",
  "password": "admin123"
}
```

Expected Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Admin",
    "email": "admin@vspaze.com",
    "role": "admin"
  }
}
```

### 3. Use the Token
Copy the token from login response and use it in subsequent requests:
```
Authorization: Bearer <your_token_here>
```

## 📡 Main API Endpoints

### Public Endpoints (No Auth Required)
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/student/login` - Student login
- `POST /api/auth/student/register` - Student registration
- `POST /api/auth/faculty/register` - Faculty application
- `GET /api/courses` - Get all courses

### Admin Endpoints (Requires Admin Token)
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/students/pending` - Pending student registrations
- `PUT /api/admin/students/approve/:id` - Approve student
- `GET /api/admin/students` - All students
- `GET /api/admin/faculty` - All faculty
- `POST /api/admin/payments` - Record payment

### Student Endpoints (Requires Student Token)
- `GET /api/student/profile` - Student profile
- `GET /api/student/courses` - Enrolled courses
- `GET /api/student/assignments` - Assignments
- `GET /api/student/tests` - Tests
- `GET /api/student/jobs` - Job listings

## 📦 Import Postman Collection

1. Open Postman
2. Click "Import"
3. Select `Vspaze_API.postman_collection.json`
4. All endpoints will be ready to test!

## 🔄 Workflow Example

### Complete Student Registration Flow:

1. **Student Registers (Public)**
```
POST /api/auth/student/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "course": "Full Stack Development",
  "address": "123 Main St"
}
```

2. **Admin Logs In**
```
POST /api/auth/admin/login
{
  "email": "admin@vspaze.com",
  "password": "admin123"
}
```

3. **Admin Views Pending Students**
```
GET /api/admin/students/pending
Headers: Authorization: Bearer <admin_token>
```

4. **Admin Approves Student**
```
PUT /api/admin/students/approve/<student_id>
Headers: Authorization: Bearer <admin_token>
{
  "password": "student123",
  "totalFee": 50000,
  "enrolledCourses": []
}
```

5. **Student Logs In**
```
POST /api/auth/student/login
{
  "email": "john@example.com",
  "password": "student123"
}
```

6. **Student Accesses Dashboard**
```
GET /api/student/profile
Headers: Authorization: Bearer <student_token>
```

## 🔧 Troubleshooting

### Server won't start?
- Check if MongoDB connection string is correct in `.env`
- Ensure port 5000 is not in use
- Run `npm install` again

### Authentication errors?
- Make sure you're sending the token in header: `Authorization: Bearer <token>`
- Check if token is expired (default: 7 days)
- Verify user exists in database

### Database connection issues?
- Verify MongoDB Atlas cluster is running
- Check IP whitelist in MongoDB Atlas
- Ensure password is URL-encoded in connection string

## 📚 Next Steps

1. **Connect Frontend**: Update frontend API calls to use `http://localhost:5000/api`
2. **Create Courses**: Use admin panel to create courses
3. **Test Student Flow**: Register → Approve → Login → Access features
4. **Add More Features**: Implement assignments, tests, attendance as needed

## 🎯 Production Deployment

When ready to deploy:

1. Update `.env` with production values
2. Set `NODE_ENV=production`
3. Use production MongoDB cluster
4. Deploy to Heroku/Railway/Render/AWS
5. Update CORS origin to your frontend domain

## 💡 Tips

- Use Postman collection for quick testing
- Check server logs for debugging
- MongoDB Compass for database visualization
- Keep JWT_SECRET secure in production
- Enable HTTPS in production

## 📞 Need Help?

Check the main README.md for detailed API documentation.

---

**Happy Coding! 🚀**
