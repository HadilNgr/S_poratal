import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { FileCode, List, User } from 'lucide-react';
import MainLayout from '../../components/Layout/MainLayout';
import ProjectCard from '../../components/Projects/ProjectCard';
import Button from '../../components/ui/Button';
import { Project, WishlistItem } from '../../types';
import { projectService, wishlistService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard: React.FC = () => {
  const { user, userType, isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [activeTab, setActiveTab] = useState<'projects' | 'wishlist' | 'profile'>('projects');
  const [loading, setLoading] = useState<boolean>(true);
  
  // Redirect if not authenticated or not a student
  if (!isAuthenticated || userType !== 'student') {
    return <Navigate to="/login" />;
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data for development
        // In production, this would be:
        // const projectsData = await projectService.getAll();
        // const wishlistData = await wishlistService.getByStudent(user.id);
        
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
          },
          {
            id: 4,
            title: "Natural Language Processing for Social Media Analysis",
            description: "Develop NLP algorithms to analyze social media content for sentiment analysis, trend detection, and user behavior patterns."
          },
          {
            id: 5,
            title: "Augmented Reality Educational App",
            description: "Create an educational application that uses augmented reality to enhance learning experiences across various subjects."
          },
          {
            id: 6,
            title: "Cybersecurity Risk Assessment Tool",
            description: "Develop a tool that assesses cybersecurity risks in computer networks and provides recommendations for improving security."
          }
        ];
        
        const mockWishlist: WishlistItem[] = [
          {
            id: 1,
            student_id: user?.id || 0,
            project_id: 2,
            project: mockProjects.find(p => p.id === 2)
          },
          {
            id: 2,
            student_id: user?.id || 0,
            project_id: 5,
            project: mockProjects.find(p => p.id === 5)
          }
        ];
        
        setProjects(mockProjects);
        setWishlist(mockWishlist);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  const handleAddToWishlist = async (projectId: number) => {
    try {
      // In production, this would call the API
      // await wishlistService.addToWishlist(user.id, projectId);
      
      // For mock data, simulate adding to wishlist
      const projectToAdd = projects.find(p => p.id === projectId);
      if (projectToAdd) {
        const newWishlistItem: WishlistItem = {
          id: Math.floor(Math.random() * 1000), // Generate random ID for mock purposes
          student_id: user?.id || 0,
          project_id: projectId,
          project: projectToAdd
        };
        
        setWishlist([...wishlist, newWishlistItem]);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };
  
  const handleRemoveFromWishlist = async (projectId: number) => {
    try {
      // Find the wishlist item to remove
      const wishlistItem = wishlist.find(item => item.project_id === projectId);
      
      if (wishlistItem) {
        // In production, this would call the API
        // await wishlistService.removeFromWishlist(wishlistItem.id);
        
        // For mock data, simulate removing from wishlist
        setWishlist(wishlist.filter(item => item.project_id !== projectId));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };
  
  const isInWishlist = (projectId: number): boolean => {
    return wishlist.some(item => item.project_id === projectId);
  };
  
  return (
    <MainLayout>
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          {user && (
            <p className="mt-2">Welcome, {user.first_name} {user.last_name}</p>
          )}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'projects'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            <FileCode className="h-4 w-4 inline-block mr-1" />
            Available Projects
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'wishlist'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('wishlist')}
          >
            <List className="h-4 w-4 inline-block mr-1" />
            My Wishlist
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <User className="h-4 w-4 inline-block mr-1" />
            My Profile
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
            {activeTab === 'projects' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Available Final-Year Projects</h2>
                <p className="text-gray-600 mb-6">Browse available projects and add them to your wishlist. You can select multiple projects based on your interests.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      inWishlist={isInWishlist(project.id)}
                      onAddToWishlist={handleAddToWishlist}
                      onRemoveFromWishlist={handleRemoveFromWishlist}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">My Project Wishlist</h2>
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      item.project && (
                        <ProjectCard
                          key={item.id}
                          project={item.project}
                          inWishlist={true}
                          onRemoveFromWishlist={handleRemoveFromWishlist}
                        />
                      )
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <p className="text-gray-600 mb-4">You haven't added any projects to your wishlist yet.</p>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => setActiveTab('projects')}
                    >
                      Browse Projects
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">My Profile</h2>
                
                <div className="bg-white shadow overflow-hidden rounded-lg">
                  <div className="px-4 py-5 sm:px-6 bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900">Student Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and contact information.</p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user?.first_name} {user?.last_name}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Student ID</dt>
                        <dd className="mt-1 text-sm text-gray-900">ST{user?.id.toString().padStart(6, '0')}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Projects in wishlist</dt>
                        <dd className="mt-1 text-sm text-gray-900">{wishlist.length}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline">Update Profile</Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default StudentDashboard;