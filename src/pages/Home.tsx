import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { BookOpen, ChevronRight, GraduationCap, UserCheck } from 'lucide-react';
import { Announcement } from '../types';
import { announcementService } from '../services/api';
import MainLayout from '../components/Layout/MainLayout';
import AnnouncementCard from '../components/Announcements/AnnouncementCard';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        // Mock data for development
        // In production, this would be: const data = await announcementService.getByDepartment('general');
        const data: Announcement[] = [
          {
            id: 1,
            title: "Registration for Fall 2025 Now Open",
            content: "Registration for the Fall 2025 semester is now open. Please log in to your student account to register for courses.",
            display: "general",
            datetime: "2025-03-15T09:00:00"
          },
          {
            id: 2,
            title: "Final Exam Schedule Posted",
            content: "The final exam schedule for the Spring 2025 semester has been posted. Please check your student portal for details.",
            display: "general",
            datetime: "2025-03-18T14:30:00"
          },
          {
            id: 3,
            title: "New Project Management Course",
            content: "A new project management course will be offered in the Computer Science department next semester. Prerequisites include CS220 and CS240.",
            display: "general",
            datetime: "2025-03-20T10:15:00"
          }
        ];
        
        setAnnouncements(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setLoading(false);
      }
    };
    
    fetchAnnouncements();
  }, []);
  
  const departments = [
    { name: 'Computer Science', path: '/departments/computer-science', icon: <Laptop /> },
    { name: 'Mathematics', path: '/departments/math', icon: <BookOpen /> },
    { name: 'Physics', path: '/departments/physics', icon: <FileText /> },
    { name: 'Chemistry', path: '/departments/chemistry', icon: <FlaskConical /> }
  ];
  
  const currentDate = format(new Date(), 'MMMM d, yyyy');
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">University of Setif 1 Farhat Abbas</h1>
              <p className="text-xl mb-6">Student Portal for Faculty of Sciences</p>
              <p className="text-blue-100 mb-8">{currentDate}</p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="primary" 
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  <GraduationCap className="mr-2" size={20} />
                  Student Login
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  <UserCheck className="mr-2" size={20} />
                  Admin Login
                </Button>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg" 
                alt="University Campus" 
                className="rounded-lg shadow-xl max-h-80 ml-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Department Quick Links */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Departments</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <a
                key={index}
                href={dept.path}
                className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  {dept.icon}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{dept.name}</h3>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* Announcements Section */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">General Announcements</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-10">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <>
              {announcements.length > 0 ? (
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <AnnouncementCard key={announcement.id} announcement={announcement} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-gray-600">No announcements available at this time.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;

import { Laptop, FileText, FlaskConical } from 'lucide-react';