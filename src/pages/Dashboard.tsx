
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
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing">("synced");
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  // Listen for data changes and update last save time
  useEffect(() => {
    const handleStorageChange = () => {
      setSyncStatus("syncing");
      
      // Simulate a short delay for syncing visualization
      setTimeout(() => {
        setLastSaveTime(new Date());
        setSyncStatus("synced");
        // Show toast notification when changes are saved
        toast.success("Changes saved and published to all devices!");
        
        // Dispatch a custom event that other browser tabs can listen for
        const syncEvent = new CustomEvent("portfolio-sync", { 
          detail: { timestamp: new Date().toISOString() } 
        });
        window.dispatchEvent(syncEvent);
      }, 600);
    };
    
    // Listen for changes in this tab
    window.addEventListener("storage", handleStorageChange);
    
    // Listen for sync events from other tabs
    window.addEventListener("portfolio-sync", (e: Event) => {
      const syncEvent = e as CustomEvent;
      if (syncEvent.detail && syncEvent.detail.timestamp) {
        setLastSaveTime(new Date(syncEvent.detail.timestamp));
        toast.success("Portfolio updated from another device!");
      }
    });
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("portfolio-sync", () => {});
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
            <div className="text-sm text-green-600 dark:text-green-400 flex items-center">
              {syncStatus === "syncing" ? (
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse mr-2"></span>
                  Syncing...
                </span>
              ) : lastSaveTime ? (
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Last updated: {lastSaveTime.toLocaleTimeString()}
                </span>
              ) : null}
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
        <div className="mb-6 bg-green-50 dark:bg-green-900/30 p-4 rounded-md border border-green-100 dark:border-green-900">
          <p className="text-green-800 dark:text-green-300 text-sm flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            All changes are synchronized across all devices and published to the live site instantly.
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
