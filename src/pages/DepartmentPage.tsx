import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import AnnouncementCard from '../components/Announcements/AnnouncementCard';
import { Announcement, Department } from '../types';
import { announcementService } from '../services/api';

const DepartmentPage: React.FC = () => {
  const { department } = useParams<{ department: string }>();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Map URL parameter to database department type
  const getDepartmentType = (): Department => {
    switch (department) {
      case 'computer-science':
        return 'computer_science';
      case 'math':
        return 'math';
      case 'physics':
        return 'physics';
      case 'chemistry':
        return 'chemistry';
      default:
        return 'general';
    }
  };
  
  // Get department display name
  const getDepartmentName = (): string => {
    switch (department) {
      case 'computer-science':
        return 'Computer Science';
      case 'math':
        return 'Mathematics';
      case 'physics':
        return 'Physics';
      case 'chemistry':
        return 'Chemistry';
      default:
        return 'Department';
    }
  };
  
  const departmentType = getDepartmentType();
  const departmentName = getDepartmentName();
  
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        // Mock data for development
        // In production, this would be: const data = await announcementService.getByDepartment(departmentType);
        const mockData: Announcement[] = [
          {
            id: 1,
            title: `${departmentName} Seminar Series`,
            content: `Our ${departmentName} Seminar Series continues next week with Professor Smith discussing recent advances in the field.`,
            display: departmentType,
            datetime: "2025-03-22T15:00:00"
          },
          {
            id: 2,
            title: `${departmentName} Research Opportunities`,
            content: `Several new research opportunities are available for students in the ${departmentName} department. Please check with your advisor for more details.`,
            display: departmentType,
            datetime: "2025-03-19T09:30:00"
          },
          {
            id: 3,
            title: `${departmentName} Course Schedule Changes`,
            content: `Please note that there have been several changes to the ${departmentName} course schedule for next semester. Check the department website for details.`,
            display: departmentType,
            datetime: "2025-03-15T11:45:00"
          }
        ];
        
        setAnnouncements(mockData);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching ${departmentType} announcements:`, error);
        setLoading(false);
      }
    };
    
    fetchAnnouncements();
  }, [department, departmentName, departmentType]);
  
  return (
    <MainLayout>
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold">{departmentName} Department</h1>
          <p className="mt-2">Faculty of Sciences, University of Setif 1 Farhat Abbas</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Department Announcements</h2>
          
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
                  <p className="text-gray-600">No announcements available for this department at this time.</p>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">About the Department</h3>
            <p className="text-gray-600">
              The {departmentName} Department at the University of Setif 1 Farhat Abbas is dedicated to excellence in teaching, research, and service. Our faculty members are recognized experts in their fields, and our programs provide students with the knowledge and skills they need to succeed in their careers.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p className="text-gray-600 mb-2">
              <strong>Department Chair:</strong> Dr. Ahmed Benali
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> {department}@univ-setif.dz
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Phone:</strong> +213 36 XX XX XX
            </p>
            <p className="text-gray-600">
              <strong>Office:</strong> Building A, Floor 2, Room 201
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DepartmentPage;