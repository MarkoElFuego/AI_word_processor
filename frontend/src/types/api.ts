// src/types/api.ts
export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  export interface Project {
    id: number;
    title: string;
    description: string;
    contentType: 'script' | 'poem' | 'novel';
    createdAt: string;
    updatedAt: string;
    owner: number;
  }
  
  export interface GeneratedContent {
    id: number;
    project: number;
    content: string;
    prompt: string;
    version: number;
    createdAt: string;
  }
  
  export interface TextEvaluation {
    id: number;
    content: number;
    creativityScore: number;
    grammarScore: number;
    structureScore: number;
    styleScore: number;
    coherenceScore: number;
    originalityScore: number;
    aiFeedback: string;
    createdAt: string;
  }
  
  export interface WritingProgress {
    id: number;
    user: number;
    project: number;
    improvementNotes: string;
    aiRecommendations: string;
    trackedMetrics: Record<string, any>;
    updatedAt: string;
  }
  
  // src/types/store.ts
  export interface RootState {
    auth: AuthState;
    projects: ProjectsState;
    editor: EditorState;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface ProjectsState {
    projects: Project[];
    currentProject: Project | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface EditorState {
    content: string;
    savedContent: string;
    currentVersion: number;
    isDirty: boolean;
    aiSuggestions: string[];
  }