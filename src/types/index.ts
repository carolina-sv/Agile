import type { PlaceHolderImages } from '@/lib/placeholder-images';

export type Status = 'Backlog' | 'To Do' | 'In Progress' | 'Done' | 'Cancelled';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface TeamMember {
  id: string;
  name: string;
  avatarUrl: string;
  skills: string[];
  workload: number; // Percentage 0-100
  role: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  assigneeId: string | null;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  teamIds: string[];
}
