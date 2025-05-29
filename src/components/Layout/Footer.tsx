import React from 'react';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* University info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <BookOpen className="mr-2 text-blue-400" size={24} />
              <h2 className="text-xl font-bold">University of Setif 1 Farhat Abbas</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Faculty of Sciences<br />
              Department of Computer Science
            </p>
            <div className="flex items-center mb-2 text-gray-300">
              <MapPin size={18} className="mr-2 text-blue-400" />
              <span>Campus El Bez, Setif 19000, Algeria</span>
            </div>
            <div className="flex items-center mb-2 text-gray-300">
              <Phone size={18} className="mr-2 text-blue-400" />
              <span>+213 36 XX XX XX</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Mail size={18} className="mr-2 text-blue-400" />
              <span>contact@univ-setif.dz</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Departments</h3>
            <ul className="space-y-2">
              <li><a href="/departments/computer-science" className="text-gray-300 hover:text-white">Computer Science</a></li>
              <li><a href="/departments/math" className="text-gray-300 hover:text-white">Mathematics</a></li>
              <li><a href="/departments/physics" className="text-gray-300 hover:text-white">Physics</a></li>
              <li><a href="/departments/chemistry" className="text-gray-300 hover:text-white">Chemistry</a></li>
            </ul>
          </div>
          
          {/* Student Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Student Resources</h3>
            <ul className="space-y-2">
              <li><a href="/login" className="text-gray-300 hover:text-white">Student Login</a></li>
              <li><a href="/student/dashboard" className="text-gray-300 hover:text-white">Project Wishlist</a></li>
              <li><a href="/" className="text-gray-300 hover:text-white">Announcements</a></li>
              <li><a href="/admin/login" className="text-gray-300 hover:text-white">Admin Login</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} University of Setif 1 Farhat Abbas. All rights reserved.</p>
          <p className="mt-2 text-sm">Web Programming Mini-Project — Student Portal</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;