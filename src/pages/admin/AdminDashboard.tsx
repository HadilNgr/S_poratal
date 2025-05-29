import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Bell, 
  FileCode, 
  Users, 
  Plus,
  Search,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import MainLayout from '../../components/Layout/MainLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { Announcement, Project, Student } from '../../types';
import { announcementService, projectService, studentService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user, userType, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'announcements' | 'projects' | 'students'>('announcements');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || userType !== 'admin') {
    return <Navigate to="/login" />;
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data for development
        // In production, this would be:
        // const announcementsData = await announcementService.getAll();
        // const projectsData = await projectService.getAll();
        // const studentsData = await studentService.getAll();
        
        const mockAnnouncements: Announcement[] = [
          {
            id: 1,
            title: "Registration for Fall 2025 Now Open",
            content: "Registration for the Fall 2025 semester is now open. Please log in to your student account to register for courses.",
            display: "general",
            datetime: "2025-03-15T09:00:00"
          },
          {
            id: 2,
            title: "New Computer Science Curriculum",
            content: "The Computer Science department has updated its curriculum for the upcoming academic year. New courses include Advanced AI and Blockchain Technology.",
            display: "computer_science",
            datetime: "2025-03-12T14:30:00"
          },
          {
            id: 3,
            title: "Physics Department Seminar Series",
            content: "The Physics Department will host a series of seminars on quantum mechanics starting next month. All students are welcome to attend.",
            display: "physics",
            datetime: "2025-03-10T10:15:00"
          }
        ];
        
        const mockProjects: Project[] = [
          {
            id: 1,
            title: "Machine Learning for Medical Image Analysis",
            description: "Develop and implement machine learning algorithms for medical image analysis to assist in diagnosing various conditions."
          },
          {
            id: 2,
            title: "Blockchain-based Voting System",
            description: "Create a secure and transparent voting system using blockchain technology that ensures vote integrity and prevents fraud."
          },
          {
            id: 3,
            title: "Smart Home Automation System",
            description: "Design and implement a smart home automation system that controls various household appliances and systems using IoT technologies."
          }
        ];
        
        const mockStudents: Student[] = [
          {
            id: 1,
            first_name: "Ahmed",
            last_name: "Benali",
            email: "ahmed.benali@student.example.com"
          },
          {
            id: 2,
            first_name: "Fatima",
            last_name: "Zahra",
            email: "fatima.zahra@student.example.com"
          },
          {
            id: 3,
            first_name: "Mohammed",
            last_name: "Salah",
            email: "mohammed.salah@student.example.com"
          },
          {
            id: 4,
            first_name: "Amina",
            last_name: "Khalid",
            email: "amina.khalid@student.example.com"
          }
        ];
        
        setAnnouncements(mockAnnouncements);
        setProjects(mockProjects);
        setStudents(mockStudents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <MainLayout>
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          {user && (
            <p className="mt-2">Welcome, {user.full_name}</p>
          )}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'announcements'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('announcements')}
          >
            <Bell className="h-4 w-4 inline-block mr-1" />
            Announcements
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'projects'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            <FileCode className="h-4 w-4 inline-block mr-1" />
            Projects
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'students'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('students')}
          >
            <Users className="h-4 w-4 inline-block mr-1" />
            Students
          </button>
        </div>
        
        {/* Tab content */}
        {loading ? (
          <div className="flex justify-center py-10">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <>
            {activeTab === 'announcements' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Manage Announcements</h2>
                  <Button variant="primary" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Create Announcement
                  </Button>
                </div>
                
                <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                  <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Search announcements..."
                      />
                    </div>
                  </div>
                  
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {announcements.map((announcement) => (
                        <tr key={announcement.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{announcement.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {announcement.display.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(announcement.datetime).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Manage Projects</h2>
                  <Button variant="primary" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add New Project
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <Card key={project.id} className="h-full">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">{project.title}</h3>
                          <p className="text-gray-600 mb-4">{project.description}</p>
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'students' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Student Management</h2>
                  <div className="relative w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Search students..."
                    />
                  </div>
                </div>
                
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {student.first_name} {student.last_name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ST{student.id.toString().padStart(6, '0')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="outline" size="sm" className="mr-2">
                              <Eye className="h-4 w-4 mr-1" />
                              View Wishlist
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;