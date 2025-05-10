
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import ProjectsManagement from "./dashboard/ProjectsManagement";
import AchievementsManagement from "./dashboard/AchievementsManagement";
import MessagesManagement from "./dashboard/MessagesManagement";
import SkillsManagement from "../components/dashboard/SkillsManagement";
import { toast } from "sonner";

const Dashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  // Listen for data changes and update last save time
  useEffect(() => {
    const handleStorageChange = () => {
      setLastSaveTime(new Date());
      // Show toast notification when changes are saved
      toast.success("Changes saved and published automatically!");
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-portfolio-dark dark:text-white">Portfolio Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-green-600 dark:text-green-400">
              {lastSaveTime && (
                <span>Last updated: {lastSaveTime.toLocaleTimeString()}</span>
              )}
            </div>
            <Button variant="outline" onClick={() => navigate("/")}>
              View Portfolio
            </Button>
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6 bg-green-50 dark:bg-green-900/30 p-4 rounded-md">
          <p className="text-green-800 dark:text-green-300 text-sm">
            All changes are automatically saved and published to the live site instantly.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full max-w-4xl mx-auto mb-8 sticky top-4 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <TabsTrigger className="flex-1" value="projects">Projects</TabsTrigger>
            <TabsTrigger className="flex-1" value="achievements">Achievements</TabsTrigger>
            <TabsTrigger className="flex-1" value="skills">Skills</TabsTrigger>
            <TabsTrigger className="flex-1" value="messages">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects">
            <ProjectsManagement />
          </TabsContent>
          
          <TabsContent value="achievements">
            <AchievementsManagement />
          </TabsContent>
          
          <TabsContent value="skills">
            <SkillsManagement />
          </TabsContent>
          
          <TabsContent value="messages">
            <MessagesManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
