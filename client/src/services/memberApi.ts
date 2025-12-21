import { apiRequest } from './client';
import { Member } from '../pages/Admin2' 

export const getMembers = async () => {
  try {
    return await apiRequest<Member[]>('/members');
  } catch (error) {
    console.error('Failed to fetch members:', error);
    throw error;
  }
};

export const createMember = async (memberData: Omit<Member, 'id'>) => {
  try {
    return await apiRequest<Member>('/members', {
      method: 'POST',
      body: JSON.stringify(memberData)
    });
  } catch (error) {
    console.error('Failed to create member:', error);
    throw error;
  }
};

export const updateMemberStatus = async (id: number, status: string) => {
  try {
    return await apiRequest<Member>(`/members/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  } catch (error) {
    console.error(`Failed to update member ${id}:`, error);
    throw error;
  }
};

export const deleteMember = async (id: number) => {
  try {
    return await apiRequest(`/members/${id}`, { method: 'DELETE' });
  } catch (error) {
    console.error(`Failed to delete member ${id}:`, error);
    throw error;
  }
};

