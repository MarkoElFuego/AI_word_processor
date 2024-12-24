// src/pages/EditorPage.tsx
import { useState } from 'react';
import { TextEditor } from '../components/Editor/TextEditor';
import { TextAnalyzer } from '../components/Editor/TextAnalyzer';

interface EditorStats {
  readabilityScore: {
    score: number;
    grade: string;
  };
  basicStats: {
    words: number;
    characters: number;
    sentences: number;
    readingTime: number;
  };
  detailedStats: {
    hardSentences: number;
    veryHardSentences: number;
    adverbs: number;
    passiveVoice: number;
  };
}

export const EditorPage = () => {
  const [content, setContent] = useState('');
  const [stats, setStats] = useState<EditorStats>({
    readabilityScore: {
      score: 0,
      grade: 'Elementary',
    },
    basicStats: {
      words: 0,
      characters: 0,
      sentences: 0,
      readingTime: 0,
    },
    detailedStats: {
      hardSentences: 0,
      veryHardSentences: 0,
      adverbs: 0,
      passiveVoice: 0,
    },
  });

  const calculateReadabilityGrade = (score: number): string => {
    if (score >= 90) return 'Elementary';
    if (score >= 80) return 'Middle School';
    if (score >= 70) return 'High School';
    if (score >= 60) return 'College';
    if (score >= 50) return 'Academic';
    return 'Professional';
  };

  const handleContentChange = (newContent: string) => {
    const plainText = newContent.replace(/<[^>]+>/g, '').trim();
    setContent(plainText);

    // Calculate basic stats
    const words = plainText ? plainText.split(/\s+/).length : 0;
    const characters = plainText.length;
    const sentences = (plainText.match(/[.!?]+/g) || []).length;
    const readingTime = Math.ceil(words / 200);

    // Calculate readability score
    const avgWordsPerSentence = sentences > 0 ? words / sentences : 0;
    const syllables = countSyllables(plainText);
    const avgSyllablesPerWord = words > 0 ? syllables / words : 0;

    const readabilityScore = Math.max(
      0,
      Math.min(
        100,
        206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord
      )
    );

    // Update stats
    setStats({
      readabilityScore: {
        score: Math.round(readabilityScore),
        grade: calculateReadabilityGrade(readabilityScore),
      },
      basicStats: {
        words,
        characters,
        sentences,
        readingTime,
      },
      detailedStats: {
        hardSentences: countComplexSentences(plainText),
        veryHardSentences: countVeryComplexSentences(plainText),
        adverbs: countAdverbs(plainText),
        passiveVoice: countPassiveVoice(plainText),
      },
    });
  };

  // Helper functions for text analysis
  const countSyllables = (text: string): number => {
    const words = text.toLowerCase()
                     .replace(/[^a-z\s]/g, '')
                     .split(/\s+/);
                     
    return words.reduce((count, word) => {
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      const syllableMatches = word.match(/[aeiouy]{1,2}/g);
      return count + (syllableMatches ? syllableMatches.length : 0);
    }, 0);
  };

  const countComplexSentences = (text: string): number => {
    const sentences = text.split(/[.!?]+\s*/).filter(Boolean);
    return sentences.filter(sentence => sentence.split(/\s+/).length > 20).length;
  };

  const countVeryComplexSentences = (text: string): number => {
    const sentences = text.split(/[.!?]+\s*/).filter(Boolean);
    return sentences.filter(sentence => sentence.split(/\s+/).length > 25).length;
  };

  const countAdverbs = (text: string): number => {
    const matches = text.match(/\w+ly\b/g);
    return matches ? matches.length : 0;
  };

  const countPassiveVoice = (text: string): number => {
    const passivePatterns = [
      /\b(?:am|is|are|was|were|be|been|being)\s+\w+ed\b/gi,
      /\b(?:has|have|had)\s+been\s+\w+ed\b/gi
    ];
    
    return passivePatterns.reduce((count, pattern) => {
      const matches = text.match(pattern);
      return count + (matches ? matches.length : 0);
    }, 0);
  };

  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="w-full lg:w-3/4">
        <TextEditor
          onChange={handleContentChange}
          initialContent={content}
          placeholder="Start writing..."
        />
      </div>
      <div className="lg:col-span-1">
        <div className="sticky top-8">
          <TextAnalyzer
            text={content}
            readabilityScore={stats.readabilityScore}
            basicStats={stats.basicStats}
            detailedStats={stats.detailedStats}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;