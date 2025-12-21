
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const apiRequest = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const token = localStorage.getItem('jci_auth_token');
  
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }), 
      ...options?.headers,
    },
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('jci_auth_token');
      localStorage.removeItem('jci_user_data');
      window.location.href = '/login';
    }
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
};