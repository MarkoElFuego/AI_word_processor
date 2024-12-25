import { useRef, useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface TextEditorProps {
  onChange: (content: string, delta: any) => void;
  onSave?: (content: string, delta: any) => Promise<void>;
  initialContent?: string;
  placeholder?: string;
  isLoading?: boolean;
}

export const TextEditor: React.FC<TextEditorProps> = ({ 
  onChange, 
  onSave,
  initialContent = '',
  placeholder = 'Write your first Epic...',
  isLoading = false
}) => {
  const [title, setTitle] = useState('Untitled');
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      const toolbarOptions = [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link'],
        ['clean'],
      ];

      quillInstance.current = new Quill(editorRef.current, {
        modules: {
          toolbar: toolbarOptions
        },
        placeholder: placeholder,
        theme: 'snow',
      });

      if (initialContent) {
        quillInstance.current.root.innerHTML = initialContent;
      }

      quillInstance.current.on('text-change', function(delta, oldDelta, source) {
        if (quillInstance.current) {
          const content = quillInstance.current.root.innerHTML;
          onChange(content, delta);
        }
      });
    }
  }, [placeholder, initialContent, onChange]);

  const handleSave = async () => {
    if (!onSave || !quillInstance.current || isLoading) return;
    
    const content = quillInstance.current.root.innerHTML;
    const delta = quillInstance.current.getContents();
    await onSave(content, delta);
  };

  return (
    <div className="w-full bg-transparent">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-0 px-0"
          placeholder="Enter title..."
        />
        <button 
          onClick={handleSave} 
          disabled={isLoading}
          className="px-4 py-2 text-sm bg-white border rounded hover:bg-gray-50 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
      <div className="min-h-[600px] bg-white rounded-lg">
        <div ref={editorRef} className="h-full quill-editor" />
      </div>
    </div>
  );
};

export default TextEditor;