import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import AdminProfile from './pages/AdminProfile';
import DashboardLanding from './pages/DashboardLanding';
import StudentManagement from './pages/StudentManagement';
import FacultyManagement from './pages/FacultyManagement';
import CourseManagement from './pages/CourseManagement';
import BatchManagement from './pages/BatchManagement';
import AttendanceManagement from './pages/AttendanceManagement';
import PaymentManagement from './pages/PaymentManagement';
import BatchDetails from './pages/BatchDetails';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import CourseDetails from './pages/CourseDetails';
import FacultyDetails from './pages/FacultyDetails';
import Announcements from './pages/Announcements';
import PendingStudents from './pages/PendingStudents';
import PendingFaculty from './pages/PendingFaculty';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('vspaze_auth') || '{}');
    if (auth.isAuthenticated) {
      setIsAuthenticated(true);
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('vspaze_auth');
    setIsAuthenticated(false);
    setCurrentView('landing');
    setActiveSection('home');
    setSelectedBatch(null);
  };

  if (!isAuthenticated) {
    if (currentView === 'login') {
      return <Login onLogin={handleLogin} />;
    }
    return <LandingPage onLogin={() => setCurrentView('login')} />;
  }

  const renderContent = () => {
    if (selectedBatch) {
      return <BatchDetails batch={selectedBatch} onBack={() => setSelectedBatch(null)} />;
    }
    if (selectedCourse) {
      return <CourseDetails course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
    }
    if (selectedFaculty) {
      return <FacultyDetails faculty={selectedFaculty} onBack={() => setSelectedFaculty(null)} />;
    }
    
    switch(activeSection) {
      case 'home': return <DashboardLanding 
        onBatchClick={(batch) => setSelectedBatch(batch)} 
        onCourseClick={(course) => setSelectedCourse(course)}
        onFacultyClick={(faculty) => setSelectedFaculty(faculty)}
      />;
      case 'students': return <StudentManagement />;
      case 'pending-students': return <PendingStudents />;
      case 'faculty': return <FacultyManagement />;
      case 'pending-faculty': return <PendingFaculty />;
      case 'courses': return <CourseManagement />;
      case 'batches': return <BatchManagement />;
      case 'attendance': return <AttendanceManagement />;
      case 'payments': return <PaymentManagement />;
      case 'announcements': return <Announcements />;
      case 'settings': return <Settings />;
      case 'notifications': return <Notifications />;
      default: return <DashboardLanding onBatchClick={(batch) => setSelectedBatch(batch)} />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        setActiveSection={(section) => {
          setActiveSection(section);
          setSelectedBatch(null);
          setSelectedCourse(null);
          setSelectedFaculty(null);
        }}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          onLogoClick={() => {
            setActiveSection('home');
            setSelectedBatch(null);
          }}
          onLogout={handleLogout}
          onProfileClick={() => setShowProfile(true)}
          onSettingsClick={() => setActiveSection('settings')}
          onNotificationClick={() => setActiveSection('notifications')}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full flex flex-col p-4 md:p-6">
            <div className="flex-1">
              {renderContent()}
            </div>
            <Footer />
          </div>
        </main>
      </div>
      {showProfile && <AdminProfile onClose={() => setShowProfile(false)} />}
    </div>
  );
}

export default App;
