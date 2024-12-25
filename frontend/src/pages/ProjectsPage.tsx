import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  content_type: string;
}

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/projects/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Documents</h1>
          <Link 
            to="/editor" 
            className="px-4 py-2 bg-white border rounded hover:bg-gray-50"
          >
            New Document
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm">
          {isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : (
            <div className="divide-y">
              {projects.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No documents yet. Create your first one!
                </div>
              ) : (
                projects.map(project => (
                  <Link 
                    key={project.id}
                    to={`/editor/${project.id}`}
                    className="p-4 flex items-center justify-between hover:bg-gray-50 block"
                  >
                    <div>
                      <h3 className="font-medium">{project.title || 'Untitled'}</h3>
                      <p className="text-sm text-gray-500">
                        Last modified: {new Date(project.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {project.content_type}
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;