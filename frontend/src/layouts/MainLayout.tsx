import { NavLink, Outlet } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold">
            AI Writing Assistant
          </NavLink>
          <div className="flex gap-4">
            <NavLink to="/dashboard" className={({ isActive }) => 
              isActive ? "opacity-100" : "opacity-70"
            }>
              <Button variant="ghost">Dashboard</Button>
            </NavLink>
            <NavLink to="/editor" className={({ isActive }) => 
              isActive ? "opacity-100" : "opacity-70"
            }>
              <Button variant="ghost">Editor</Button>
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => 
              isActive ? "opacity-100" : "opacity-70"
            }>
              <Button variant="outline">Login</Button>
            </NavLink>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};