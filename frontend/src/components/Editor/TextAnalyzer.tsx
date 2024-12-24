// src/components/Editor/TextAnalyzer.tsx
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReadabilityScore {
  score: number;
  grade: string;
}

interface BasicStats {
  words: number;
  characters: number;
  sentences: number;
  readingTime: number;
}

interface DetailedStats {
  hardSentences: number;
  veryHardSentences: number;
  adverbs: number;
  passiveVoice: number;
}

interface TextAnalyzerProps {
  text: string;
  readabilityScore: ReadabilityScore;
  basicStats: BasicStats;
  detailedStats: DetailedStats;
}

export const TextAnalyzer: React.FC<TextAnalyzerProps> = ({
  text,
  readabilityScore,
  basicStats,
  detailedStats
}) => {
  const getReadabilityColor = (score: number): string => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400';
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <aside className="w-64 space-y-4 fixed right-4 top-4 bottom-4 overflow-y-auto py-4 px-2">
      {/* Readability Score Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Reading Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
              <div className="text-2xl font-bold">{readabilityScore.grade}</div>
              <div className={`text-3xl font-mono ${getReadabilityColor(readabilityScore.score)}`}>
                {readabilityScore.score}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Stats Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Basic Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Words</span>
              <span className="font-mono">{basicStats.words}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Characters</span>
              <span className="font-mono">{basicStats.characters}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Sentences</span>
              <span className="font-mono">{basicStats.sentences}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Reading Time</span>
              <span className="font-mono">{basicStats.readingTime} min</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Writing Analysis Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Writing Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {detailedStats.veryHardSentences > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
              <div className="text-red-800 dark:text-red-200">
                <span className="font-medium">Very Hard Sentences</span>
                <div className="text-sm">
                  {detailedStats.veryHardSentences} sentence{detailedStats.veryHardSentences !== 1 ? 's' : ''} found
                </div>
              </div>
            </div>
          )}
          
          {detailedStats.hardSentences > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
              <div className="text-yellow-800 dark:text-yellow-200">
                <span className="font-medium">Hard Sentences</span>
                <div className="text-sm">
                  {detailedStats.hardSentences} sentence{detailedStats.hardSentences !== 1 ? 's' : ''} found
                </div>
              </div>
            </div>
          )}

          {detailedStats.adverbs > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
              <div className="text-blue-800 dark:text-blue-200">
                <span className="font-medium">Adverbs</span>
                <div className="text-sm">
                  {detailedStats.adverbs} adverb{detailedStats.adverbs !== 1 ? 's' : ''} found
                </div>
              </div>
            </div>
          )}

          {detailedStats.passiveVoice > 0 && (
            <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
              <div className="text-purple-800 dark:text-purple-200">
                <span className="font-medium">Passive Voice</span>
                <div className="text-sm">
                  {detailedStats.passiveVoice} instance{detailedStats.passiveVoice !== 1 ? 's' : ''} found
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </aside>
  );
};

export default TextAnalyzer;