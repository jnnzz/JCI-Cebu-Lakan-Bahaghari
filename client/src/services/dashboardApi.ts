import { apiRequest } from './client';
import { DashboardStat } from '../pages/Admin2';

export const getDashboardSummary = async () => {
  try {
    return await apiRequest<{ stats: DashboardStat[], recentActivity: any[] }>('/dashboard/summary');
  } catch (error) {
    console.error('Failed to fetch dashboard summary:', error);
    throw error;
  }
};