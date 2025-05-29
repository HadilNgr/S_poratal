// Define types based on database schema

export type Student = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type Admin = {
  id: number;
  email: string;
  full_name: string;
};

export type Department = 'general' | 'computer_science' | 'physics' | 'chemistry' | 'math';

export type Announcement = {
  id: number;
  title: string;
  content: string;
  display: Department;
  datetime: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
};

export type WishlistItem = {
  id: number;
  student_id: number;
  project_id: number;
  project?: Project;
};

export type User = Student | Admin;

export interface AuthContextType {
  user: User | null;
  userType: 'student' | 'admin' | null;
  login: (email: string, password: string, type: 'student' | 'admin') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}