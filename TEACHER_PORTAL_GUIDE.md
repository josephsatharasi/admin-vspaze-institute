# Teacher Portal - User Guide

## Login Credentials
- **Email:** teacher@test.com
- **Password:** teacher123

## What You'll See After Login

### 1. Dashboard
- Shows statistics: Courses, Students, Assignments, Tests
- Quick actions panel
- Recent activities

### 2. My Courses
- Shows 2 assigned courses:
  - Full Stack Development
  - Data Science & AI
- If empty, contact admin to assign courses

### 3. Assignments
- **Create Assignment:**
  1. Click "Create Assignment" button
  2. Fill in:
     - Title
     - Description
     - Select Course
     - Due Date
     - Total Marks
  3. Click "Create"

- **Edit Assignment:**
  - Click the blue edit icon on any assignment card
  - Update fields
  - Click "Update"

- **Delete Assignment:**
  - Click the red trash icon
  - Confirm deletion

### 4. Tests
- **Create Test:**
  1. Click "Create Test" button
  2. Fill in:
     - Title
     - Description (optional)
     - Select Course
     - Test Date
     - Duration (minutes)
     - Total Marks
  3. Click "Create"

- **Edit Test:**
  - Click the blue edit icon on any test card
  - Update fields
  - Click "Update"

- **Delete Test:**
  - Click the red trash icon
  - Confirm deletion

### 5. Students
- View all active students
- Search by name or email
- See enrolled courses and status

### 6. Schedule
- View your teaching schedule
- (Currently empty - will be populated by admin)

## Features Implemented

✅ Full CRUD operations for Assignments
✅ Full CRUD operations for Tests
✅ View assigned courses
✅ View enrolled students
✅ Dashboard with statistics
✅ Responsive design
✅ Loading states
✅ Empty state messages
✅ Error handling

## Troubleshooting

### Pages are empty?
1. Make sure you're logged in with correct credentials
2. Check if courses are assigned (contact admin)
3. Create your first assignment/test using the buttons

### Can't create assignment/test?
1. Make sure you have courses assigned
2. Fill all required fields
3. Check browser console for errors

### Not seeing courses?
- Courses need to be assigned by admin
- Run: `node assign-course-to-teacher.js` in backend folder

## API Endpoints Used

- `GET /api/faculty/dashboard` - Dashboard stats
- `GET /api/faculty/profile` - Teacher profile
- `GET /api/faculty/courses` - Assigned courses
- `GET /api/faculty/assignments` - List assignments
- `POST /api/faculty/assignments` - Create assignment
- `PUT /api/faculty/assignments/:id` - Update assignment
- `DELETE /api/faculty/assignments/:id` - Delete assignment
- `GET /api/faculty/tests` - List tests
- `POST /api/faculty/tests` - Create test
- `PUT /api/faculty/tests/:id` - Update test
- `DELETE /api/faculty/tests/:id` - Delete test
- `GET /api/faculty/students` - List students
- `GET /api/faculty/schedule` - View schedule

## Next Steps

1. Login with teacher@test.com / teacher123
2. Check "My Courses" - should see 2 courses
3. Go to "Assignments" - click "Create Assignment"
4. Go to "Tests" - click "Create Test"
5. View created items with edit/delete options
