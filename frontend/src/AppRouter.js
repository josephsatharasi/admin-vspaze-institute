import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import InstituteLayout from './institute/InstituteLayout';
import Home from './institute/pages/Home';
import About from './institute/pages/About';
import Courses from './institute/pages/Courses';
import Faculty from './institute/pages/Faculty';

import Contact from './institute/pages/Contact';
import SuccessStories from './institute/pages/SuccessStories';
import FacultyDetail from './institute/pages/FacultyDetail';
import TeacherRegistration from './institute/pages/TeacherRegistration';
import Certifications from './institute/pages/Certifications';
import Admissions from './institute/pages/Admissions';
import StudentRegistration from './institute/pages/StudentRegistration';
import CourseDetail from './institute/pages/CourseDetail';
import AdminLogin from './pages/AdminLogin';
import AdminApp from './App';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Institute Public Website */}
        <Route path="/" element={<InstituteLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="courses" element={<Courses />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="success-stories" element={<SuccessStories />} />
          <Route path="faculty/:id" element={<FacultyDetail />} />
          <Route path="teacher-registration" element={<TeacherRegistration />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="contact" element={<Contact />} />
          <Route path="student-registration" element={<StudentRegistration />} />
          <Route path="course/:id" element={<CourseDetail />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
