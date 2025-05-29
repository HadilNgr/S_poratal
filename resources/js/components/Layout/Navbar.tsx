import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Laptop, FlaskConical, FileText, Home, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, userType, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600 border-blue-600' : 'text-gray-600 hover:text-blue-600 hover:border-blue-600';
  };
  
  const departmentLinks = [
    { path: '/departments/computer-science', name: 'Computer Science', icon: <Laptop size={18} /> },
    { path: '/departments/math', name: 'Mathematics', icon: <BookOpen size={18} /> },
    { path: '/departments/physics', name: 'Physics', icon: <FileText size={18} /> },
    { path: '/departments/chemistry', name: 'Chemistry', icon: <FlaskConical size={18} /> }
  ];
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center text-xl font-bold text-blue-600"
            >
              <BookOpen className="mr-2" />
              Student Portal
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
              <Link
                to="/"
                className={`inline-flex items-center px-3 py-2 border-b-2 font-medium ${isActive('/')}`}
              >
                <Home size={18} className="mr-1" />
                Home
              </Link>
              
              {departmentLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center px-3 py-2 border-b-2 font-medium ${isActive(link.path)}`}
                >
                  {link.icon}
                  <span className="ml-1">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  to={userType === 'admin' ? '/admin/dashboard' : '/student/dashboard'}
                  className="inline-flex items-center px-3 py-2 border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="inline-flex items-center px-3 py-2 border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                >
                  <LogIn size={18} className="mr-1" />
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="sm:hidden border-t border-gray-200">
        <div className="px-2 py-2 space-y-1">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
            }`}
          >
            <Home size={18} className="mr-1 inline" />
            Home
          </Link>
          
          {departmentLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.path ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              {React.cloneElement(link.icon, { className: 'mr-1 inline' })}
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;