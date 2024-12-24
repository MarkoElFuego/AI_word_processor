// src/pages/HomePage.tsx
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card"

export const HomePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to AI Writing Assistant</h1>
        <Button>Get Started</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Writing</CardTitle>
            <CardDescription>Get intelligent suggestions and improvements</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Enhance your writing with advanced AI assistance.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Real-time Analysis</CardTitle>
            <CardDescription>Instant feedback on your content</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Get immediate insights about your writing style and quality.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Writing Progress</CardTitle>
            <CardDescription>Track your improvement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Monitor your writing development with detailed analytics.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}