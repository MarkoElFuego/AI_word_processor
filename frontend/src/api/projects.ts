import { apiClient } from './client';
import { Project, GeneratedContent, TextEvaluation } from '@/types/api';

export const projectsApi = {
  getAll: () => 
    apiClient.get<Project[]>('/projects/'),

  getById: (id: number) =>
    apiClient.get<Project>(`/projects/${id}/`),

  create: (data: Partial<Project>) =>
    apiClient.post<Project>('/projects/', data),

  update: (id: number, data: Partial<Project>) =>
    apiClient.patch<Project>(`/projects/${id}/`, data),

  delete: (id: number) =>
    apiClient.delete(`/projects/${id}/`),

  generateContent: (projectId: number, prompt: string) =>
    apiClient.post<GeneratedContent>(`/projects/${projectId}/generate/`, { prompt }),

  evaluateContent: (contentId: number) =>
    apiClient.post<TextEvaluation>(`/contents/${contentId}/evaluate/`)
};