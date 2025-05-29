import axios from 'axios';
import { Announcement, Department, Project, Student, WishlistItem } from '../types';

// Set the base URL to your PHP backend
const API_URL = 'http://localhost/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication endpoints
export const authService = {
  loginStudent: async (email: string, password: string) => {
    try {
      const response = await api.post('/student/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  loginAdmin: async (email: string, password: string) => {
    try {
      const response = await api.post('/admin/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
};

// Announcements endpoints
export const announcementService = {
  getAll: async () => {
    try {
      const response = await api.get('/announcements');
      return response.data as Announcement[];
    } catch (error) {
      console.error('Error fetching announcements:', error);
      throw error;
    }
  },
  
  getByDepartment: async (department: Department) => {
    try {
      const response = await api.get(`/announcements/${department}`);
      return response.data as Announcement[];
    } catch (error) {
      console.error(`Error fetching ${department} announcements:`, error);
      throw error;
    }
  },
  
  create: async (announcement: Omit<Announcement, 'id'>) => {
    try {
      const response = await api.post('/admin/announcements', announcement);
      return response.data;
    } catch (error) {
      console.error('Error creating announcement:', error);
      throw error;
    }
  }
};

// Projects endpoints
export const projectService = {
  getAll: async () => {
    try {
      const response = await api.get('/projects');
      return response.data as Project[];
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },
  
  create: async (project: Omit<Project, 'id'>) => {
    try {
      const response = await api.post('/admin/projects', project);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }
};

// Student wishlist endpoints
export const wishlistService = {
  getByStudent: async (studentId: number) => {
    try {
      const response = await api.get(`/student/${studentId}/wishlist`);
      return response.data as WishlistItem[];
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      throw error;
    }
  },
  
  addToWishlist: async (studentId: number, projectId: number) => {
    try {
      const response = await api.post(`/student/${studentId}/wishlist`, { project_id: projectId });
      return response.data;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  },
  
  removeFromWishlist: async (wishlistId: number) => {
    try {
      const response = await api.delete(`/student/wishlist/${wishlistId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  }
};

// Admin student management endpoints
export const studentService = {
  getAll: async () => {
    try {
      const response = await api.get('/admin/students');
      return response.data as Student[];
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },
  
  getStudentWishlists: async () => {
    try {
      const response = await api.get('/admin/student-wishlists');
      return response.data;
    } catch (error) {
      console.error('Error fetching student wishlists:', error);
      throw error;
    }
  }
};