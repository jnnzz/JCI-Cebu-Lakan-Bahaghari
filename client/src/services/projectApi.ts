
import { apiRequest } from './client';
import { Project } from '../pages/Admin2';

export const getProjects = async () => {
  try {
    return await apiRequest<Project[]>('/projects');
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
};

export const approveProject = async (id: number) => {
  try {
    return await apiRequest<Project>(`/projects/${id}/approve`, { method: 'POST' });
  } catch (error) {
    console.error(`Failed to approve project ${id}:`, error);
    throw error;
  }
};

export const rejectProject = async (id: number) => {
  try {
    return await apiRequest<Project>(`/projects/${id}/reject`, { method: 'POST' });
  } catch (error) {
    console.error(`Failed to reject project ${id}:`, error);
    throw error;
  }
};