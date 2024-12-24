// src/pages/DashboardPage.tsx
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card"

// Koristimo const export
export const DashboardPage = () => {
  console.log('DashboardPage rendering - TEST');
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Test Content - If you can see this, rendering works!</p>
        </CardContent>
      </Card>
    </div>
  );
}