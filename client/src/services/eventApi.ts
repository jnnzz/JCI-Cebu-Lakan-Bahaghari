import { apiRequest } from './client';
import { JCIEvent } from '../pages/Admin2';


export const getEvents = async () => {
  try {
    return await apiRequest<JCIEvent[]>('/events');
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
};

export const createEvent = async (data: Partial<JCIEvent>) => {
  try {
    return await apiRequest<JCIEvent>('/events', { method: 'POST', body: JSON.stringify(data) });
  } catch (error) {
    console.error('Failed to create event:', error);
    throw error;
  }
}; 