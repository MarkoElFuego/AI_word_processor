import { apiClient } from './client';
import { AuthResponse, User } from '@/types/api';

export const authApi = {
  login: (username: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/login/', { username, password }),

  register: (username: string, email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/register/', { username, email, password }),

  getCurrentUser: () =>
    apiClient.get<User>('/auth/user/'),

  logout: () =>
    apiClient.post('/auth/logout/')
};
