import { apiRequest } from './client';
import { Feedback, Blog } from '../pages/Admin2';

export const getFeedback = async () => {
  try {
    return await apiRequest<Feedback[]>('/feedback');
  } catch (error) {
    console.error('Failed to fetch feedback:', error);
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    return await apiRequest<Blog[]>('/blogs');
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    throw error;
  }
};

export const replyToFeedback = async (id: number, message: string) => {
  try {
    return await apiRequest(`/feedback/${id}/reply`, { method: 'POST', body: JSON.stringify({ message }) });
  } catch (error) {
    console.error(`Failed to reply to feedback ${id}:`, error);
    throw error;
  }
};