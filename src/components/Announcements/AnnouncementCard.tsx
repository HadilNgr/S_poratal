import React from 'react';
import { format } from 'date-fns';
import { Bell } from 'lucide-react';
import { Announcement, Department } from '../../types';
import Card from '../ui/Card';

interface AnnouncementCardProps {
  announcement: Announcement;
}

const departmentColors: Record<Department, string> = {
  general: 'bg-blue-100 text-blue-800',
  computer_science: 'bg-purple-100 text-purple-800',
  physics: 'bg-green-100 text-green-800',
  chemistry: 'bg-yellow-100 text-yellow-800',
  math: 'bg-red-100 text-red-800'
};

const departmentNames: Record<Department, string> = {
  general: 'General',
  computer_science: 'Computer Science',
  physics: 'Physics', 
  chemistry: 'Chemistry',
  math: 'Mathematics'
};

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  const formattedDate = format(new Date(announcement.datetime), 'MMM d, yyyy • h:mm a');
  
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Bell className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium text-gray-900">{announcement.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${departmentColors[announcement.display]}`}>
              {departmentNames[announcement.display]}
            </span>
          </div>
          <p className="text-gray-600 mb-3">{announcement.content}</p>
          <div className="text-sm text-gray-500">{formattedDate}</div>
        </div>
      </div>
    </Card>
  );
};

export default AnnouncementCard;