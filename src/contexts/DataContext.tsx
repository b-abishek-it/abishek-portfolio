
import React, { createContext, useContext, useState, useEffect } from "react";

// Project type definition
export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  codeLink: string;
  demoLink: string;
};

// Achievement type definition
export type Achievement = {
  id: string;
  title: string;
  image: string;
};

type DataContextType = {
  projects: Project[];
  achievements: Achievement[];
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addAchievement: (achievement: Omit<Achievement, "id">) => void;
  updateAchievement: (achievement: Achievement) => void;
  deleteAchievement: (id: string) => void;
};

// Initial projects data
const initialProjects: Project[] = [
  {
    id: "1",
    title: "Weather App",
    description: "A React-based app that fetches real-time weather data via API and displays it with a clean, responsive UI.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500",
    codeLink: "https://github.com",
    demoLink: "https://demo-link.com"
  },
  {
    id: "2",
    title: "Todo List App",
    description: "A simple React-based app to manage daily tasks. Users can add, complete, and delete todos easily.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=500",
    codeLink: "https://github.com",
    demoLink: "https://demo-link.com"
  },
  {
    id: "3",
    title: "Passport Automation System",
    description: "A React-based web application for applying, tracking, and managing passport services. It streamlines the process for users, police, and officers.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=500",
    codeLink: "https://github.com",
    demoLink: "https://demo-link.com"
  }
];

// Initial achievements data 
const initialAchievements: Achievement[] = [
  {
    id: "1",
    title: "Achievement 1",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "2",
    title: "Achievement 2",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "3",
    title: "Achievement 3",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "4",
    title: "Achievement 4",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=500"
  }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  
  // Load data from localStorage or use initial data
  useEffect(() => {
    const storedProjects = localStorage.getItem("portfolio-projects");
    const storedAchievements = localStorage.getItem("portfolio-achievements");
    
    setProjects(storedProjects ? JSON.parse(storedProjects) : initialProjects);
    setAchievements(storedAchievements ? JSON.parse(storedAchievements) : initialAchievements);
  }, []);
  
  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("portfolio-projects", JSON.stringify(projects));
    localStorage.setItem("portfolio-achievements", JSON.stringify(achievements));
  }, [projects, achievements]);
  
  // Project CRUD operations
  const addProject = (project: Omit<Project, "id">) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects(prev => [...prev, newProject]);
  };
  
  const updateProject = (project: Project) => {
    setProjects(prev => prev.map(p => p.id === project.id ? project : p));
  };
  
  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };
  
  // Achievement CRUD operations
  const addAchievement = (achievement: Omit<Achievement, "id">) => {
    const newAchievement = { ...achievement, id: Date.now().toString() };
    setAchievements(prev => [...prev, newAchievement]);
  };
  
  const updateAchievement = (achievement: Achievement) => {
    setAchievements(prev => prev.map(a => a.id === achievement.id ? achievement : a));
  };
  
  const deleteAchievement = (id: string) => {
    setAchievements(prev => prev.filter(a => a.id !== id));
  };
  
  return (
    <DataContext.Provider 
      value={{ 
        projects, 
        achievements, 
        addProject, 
        updateProject, 
        deleteProject, 
        addAchievement, 
        updateAchievement, 
        deleteAchievement 
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
