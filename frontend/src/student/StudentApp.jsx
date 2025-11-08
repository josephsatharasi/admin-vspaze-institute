import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import StudentHeader from './components/StudentHeader';
import StudentSidebar from './components/StudentSidebar';
import BottomNav from './components/BottomNav';
import StudentDashboard from './pages/StudentDashboard';
import StudentProfile from './pages/StudentProfile';
import MyCourses from './pages/MyCourses';
import Payments from './pages/Payments';
import CourseContent from './pages/CourseContent';
import Attendance from './pages/Attendance';
import Assignments from './pages/Assignments';
import Tests from './pages/Tests';
import Home from './pages/Home';
import Activities from './pages/Activities';
import GameZone from './pages/GameZone';
import CodePractice from './pages/CodePractice';
import Jobs from './pages/Jobs';
import ProfileNew from './pages/ProfileNew';
import Notifications from './pages/Notifications';

function StudentApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('student_auth') || '{}');
    if (auth.isAuthenticated) {
      setIsAuthenticated(true);
      fetchStudentData();
    } else {
      navigate('/student-login');
    }
  }, [navigate]);

  const fetchStudentData = async () => {
    try {
      const response = await api.get('/student/profile');
      setIsPaid(response.data.student?.dueAmount === 0);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('student_auth');
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  const renderContent = () => {
    switch(activeSection) {
      case 'home': return <Home onMenuClick={() => setSidebarOpen(true)} onNavigateToCourses={() => setActiveSection('courses')} />;
      case 'activities': return <GameZone onMenuClick={() => setSidebarOpen(true)} onGameSelect={(game) => {
        if (game.id === 'quick-quiz') setActiveSection('assignments');
        else if (game.id === 'code-challenge') setActiveSection('tests');
      }} />;
      case 'practice': return <CodePractice onMenuClick={() => setSidebarOpen(true)} />;
      case 'jobs': return <Jobs onMenuClick={() => setSidebarOpen(true)} />;
      case 'profile': return <ProfileNew onMenuClick={() => setSidebarOpen(true)} />;
      case 'notifications': return <Notifications onBack={() => setActiveSection('home')} />;
      case 'dashboard': return <StudentDashboard />;
      case 'oldProfile': return <StudentProfile />;
      case 'courses': return <CourseContent />;
      case 'payments': return <Payments />;
      case 'attendance': return <Attendance />;
      case 'assignments': return <Assignments />;
      case 'tests': return <Tests />;
      default: return <Home />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <StudentSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <StudentHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          onLogout={handleLogout}
          onNotificationClick={() => setActiveSection('notifications')}
          hideOnMobile={['home', 'activities', 'practice', 'jobs', 'profile', 'notifications'].includes(activeSection)}
        />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
        <BottomNav activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
    </div>
  );
}

export default StudentApp;
