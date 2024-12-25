import { useState } from 'react';
import { TextEditor } from '../components/Editor/TextEditor';
import { useParams } from 'react-router-dom';

interface DeltaOperation {
  insert?: string | object;
  delete?: number;
  retain?: number;
  attributes?: object;
}

export const EditorPage = () => {
  const [content, setContent] = useState('');
  const [currentDelta, setCurrentDelta] = useState<DeltaOperation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const handleContentChange = (newContent: string, delta: any) => {
    setContent(newContent);
    setCurrentDelta(delta.ops || []);
  };

  const handleSave = async (content: string, delta: any) => {
    try {
      setIsLoading(true);
      let projectId = id;
      const token = localStorage.getItem('token');
      
      // Ako nemamo projekat, prvo ga kreiramo
      if (!projectId) {
        const createResponse = await fetch('/api/projects/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify({
            title: 'New Project',
            content_type: 'article',
            description: '',
            delta: delta.ops // Čuvamo delta operacije
          })
        });

        if (!createResponse.ok) {
          throw new Error('Failed to create project');
        }

        const projectData = await createResponse.json();
        projectId = projectData.id;
      }

      // Čuvamo sadržaj sa delta podacima
      const response = await fetch(`/api/projects/${projectId}/generate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          prompt: content,
          delta: delta.ops // Šaljemo delta operacije
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const data = await response.json();
      if (data.content) {
        setContent(data.content);
      }

    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white shadow-sm rounded-lg">
          <TextEditor
            onChange={handleContentChange}
            onSave={handleSave}
            initialContent={content}
            placeholder="Write your first Epic..."
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;