import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, LogIn, UserCog } from 'lucide-react';
import MainLayout from '../components/Layout/MainLayout';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'student' | 'admin'>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const success = await login(email, password, userType);
      
      if (success) {
        // Redirect based on user type
        if (userType === 'student') {
          navigate('/student/dashboard');
        } else {
          navigate('/admin/dashboard');
        }
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[70vh]">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <BookOpen className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Access the Student Portal
            </p>
          </div>
          
          <div className="mt-8 bg-white py-8 px-4 shadow rounded-lg sm:px-10">
            <div className="mb-6">
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 text-center ${
                    userType === 'student'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setUserType('student')}
                >
                  <LogIn className="h-5 w-5 inline-block mr-1" />
                  Student
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 text-center ${
                    userType === 'admin'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setUserType('admin')}
                >
                  <UserCog className="h-5 w-5 inline-block mr-1" />
                  Admin
                </button>
              </div>
            </div>
            
            {error && (
              <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-sm">
                {error}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <Button type="submit" fullWidth isLoading={loading}>
                  Sign in
                </Button>
              </div>
            </form>
            
            {/* Demo credentials - for development purposes only */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Demo Credentials</h3>
              <div className="text-xs text-gray-500 space-y-1">
                <p><strong>Student:</strong> student@example.com / password123</p>
                <p><strong>Admin:</strong> admin@example.com / admin123</p>
                <p className="italic mt-1">Note: These are for demonstration purposes only</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;