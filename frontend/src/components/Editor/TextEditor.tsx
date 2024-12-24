import { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from 'lucide-react';

interface TextStats {
  hardSentences: number;
  veryHardSentences: number;
  adverbs: number;
  passiveVoice: number;
}

interface TextEditorProps {
  onChange: (content: string) => void;
  onStatsUpdate?: (stats: TextStats) => void;
  initialContent?: string;
  placeholder?: string;
  onSave?: () => void;
}


export const TextEditor: React.FC<TextEditorProps> = ({ 
  onChange, 
  onStatsUpdate,
  initialContent = '',
  placeholder = 'Start writing...',
  onSave 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      const toolbarOptions = [
        [{ header: [1, 2, 3, false] }],
        [{ font: ['roboto', 'lobster', 'serif', 'monospace'] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        
        ['link', 'image', 'video'],
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

      quillInstance.current.on('text-change', () => {
        if (quillInstance.current) {
          const content = quillInstance.current.root.innerHTML;
          onChange(content);
          
          if (onStatsUpdate) {
            const plainText = quillInstance.current.getText();
            const stats: TextStats = {
              hardSentences: 0,
              veryHardSentences: 0,
              adverbs: 0,
              passiveVoice: 0
            };
            onStatsUpdate(stats);
          }
        }
      });
    }

    return () => {
      if (quillInstance.current) {
        // Cleanup if needed
      }
    };
  }, [placeholder, initialContent, onChange, onStatsUpdate]);

  const handleSave = async () => {
    if (onSave) {
      setIsLoading(true);
      try {
        await onSave();
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Card className="w-full border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save
          </Button>
        </div>
        <div className="min-h-[600px] bg-background rounded-lg">
          <div ref={editorRef} className="h-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default TextEditor;