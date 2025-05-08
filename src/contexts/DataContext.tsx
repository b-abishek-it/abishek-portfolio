
import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { toast } from "sonner";

// Define types
export type Project = {
  id: string;
  title: string;
  description: string;
  image: string | File;
  codeLink: string;
  demoLink: string;
  imagePreview?: string;
};

export type Achievement = {
  id: string;
  title: string;
  image: string | File;
  imagePreview?: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
};

type DataState = {
  projects: Project[];
  achievements: Achievement[];
  messages: Message[];
};

type DataAction =
  | { type: "SET_DATA"; payload: Partial<DataState> }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "UPDATE_PROJECT"; payload: Project }
  | { type: "DELETE_PROJECT"; payload: string }
  | { type: "ADD_ACHIEVEMENT"; payload: Achievement }
  | { type: "UPDATE_ACHIEVEMENT"; payload: Achievement }
  | { type: "DELETE_ACHIEVEMENT"; payload: string }
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "DELETE_MESSAGE"; payload: string }
  | { type: "MARK_MESSAGE_READ"; payload: string };

type DataContextType = {
  projects: Project[];
  achievements: Achievement[];
  messages: Message[];
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addAchievement: (achievement: Omit<Achievement, "id">) => void;
  updateAchievement: (achievement: Achievement) => void;
  deleteAchievement: (id: string) => void;
  addMessage: (message: Omit<Message, "id">) => void;
  deleteMessage: (id: string) => void;
  markMessageAsRead: (id: string) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<string>;
};

// Initial data
const initialData: DataState = {
  projects: [
    {
      id: "1",
      title: "Weather App",
      description: "A React-based app that fetches real-time weather data via API and displays it with a clean, responsive UI.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=400",
      codeLink: "https://github.com/username/weather-app",
      demoLink: "https://weather-app-demo.netlify.app"
    },
    {
      id: "2",
      title: "Todo List App",
      description: "A simple React-based app to manage daily tasks. Users can add, complete, and delete todos easily.",
      image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=400",
      codeLink: "https://github.com/username/todo-app",
      demoLink: "https://todo-app-demo.netlify.app"
    },
    {
      id: "3",
      title: "Passport Automation System",
      description: "A React-based web application for applying, tracking, and managing passport services. It streamlines the process for users, police, and officers.",
      image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=400",
      codeLink: "https://github.com/username/passport-system",
      demoLink: "https://passport-system-demo.netlify.app"
    }
  ],
  achievements: [
    {
      id: "1",
      title: "Hackathon Winner",
      image: "https://images.unsplash.com/photo-1496469888073-80de7e952517?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "2",
      title: "Best Project Award",
      image: "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "3",
      title: "Coding Competition",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "4",
      title: "Certificate of Excellence",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=400"
    }
  ],
  messages: []
};

// Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Reducer function
function dataReducer(state: DataState, action: DataAction): DataState {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, ...action.payload };
      
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
      
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map(project => 
          project.id === action.payload.id ? action.payload : project
        )
      };
      
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload)
      };
      
    case "ADD_ACHIEVEMENT":
      return {
        ...state,
        achievements: [...state.achievements, action.payload]
      };
      
    case "UPDATE_ACHIEVEMENT":
      return {
        ...state,
        achievements: state.achievements.map(achievement => 
          achievement.id === action.payload.id ? action.payload : achievement
        )
      };
      
    case "DELETE_ACHIEVEMENT":
      return {
        ...state,
        achievements: state.achievements.filter(achievement => achievement.id !== action.payload)
      };
      
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
      
    case "DELETE_MESSAGE":
      return {
        ...state,
        messages: state.messages.filter(message => message.id !== action.payload)
      };
      
    case "MARK_MESSAGE_READ":
      return {
        ...state,
        messages: state.messages.map(message => 
          message.id === action.payload ? { ...message, read: true } : message
        )
      };
      
    default:
      return state;
  }
}

// Provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialData);
  
  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("portfolioData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: "SET_DATA", payload: parsedData });
      }
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
    }
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("portfolioData", JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save data to localStorage:", error);
    }
  }, [state]);
  
  // Handle image file uploads
  const handleImageChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return "";
    
    // Check file type
    if (!file.type.match('image.*')) {
      toast.error("Only image files are allowed");
      return "";
    }
    
    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return "";
    }
    
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        resolve(result);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  
  // Project actions
  const addProject = useCallback((project: Omit<Project, "id">) => {
    const id = Date.now().toString();
    dispatch({ 
      type: "ADD_PROJECT", 
      payload: { 
        ...project, 
        id,
        // Convert File object to URL string if necessary
        image: project.imagePreview || project.image
      } 
    });
  }, []);
  
  const updateProject = useCallback((project: Project) => {
    dispatch({ 
      type: "UPDATE_PROJECT", 
      payload: {
        ...project,
        // Convert File object to URL string if necessary
        image: project.imagePreview || project.image
      }
    });
  }, []);
  
  const deleteProject = useCallback((id: string) => {
    dispatch({ type: "DELETE_PROJECT", payload: id });
  }, []);
  
  // Achievement actions
  const addAchievement = useCallback((achievement: Omit<Achievement, "id">) => {
    const id = Date.now().toString();
    dispatch({ 
      type: "ADD_ACHIEVEMENT", 
      payload: { 
        ...achievement, 
        id,
        // Convert File object to URL string if necessary
        image: achievement.imagePreview || achievement.image
      } 
    });
  }, []);
  
  const updateAchievement = useCallback((achievement: Achievement) => {
    dispatch({ 
      type: "UPDATE_ACHIEVEMENT", 
      payload: {
        ...achievement,
        // Convert File object to URL string if necessary
        image: achievement.imagePreview || achievement.image
      }
    });
  }, []);
  
  const deleteAchievement = useCallback((id: string) => {
    dispatch({ type: "DELETE_ACHIEVEMENT", payload: id });
  }, []);
  
  // Message actions
  const addMessage = useCallback((message: Omit<Message, "id">) => {
    const id = Date.now().toString();
    dispatch({ type: "ADD_MESSAGE", payload: { ...message, id } });
  }, []);
  
  const deleteMessage = useCallback((id: string) => {
    dispatch({ type: "DELETE_MESSAGE", payload: id });
  }, []);
  
  const markMessageAsRead = useCallback((id: string) => {
    dispatch({ type: "MARK_MESSAGE_READ", payload: id });
  }, []);
  
  return (
    <DataContext.Provider value={{
      ...state,
      addProject,
      updateProject,
      deleteProject,
      addAchievement,
      updateAchievement,
      deleteAchievement,
      addMessage,
      deleteMessage,
      markMessageAsRead,
      handleImageChange
    }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
