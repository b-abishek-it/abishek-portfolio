
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type User = {
  username: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("portfolio-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const login = (username: string, password: string): boolean => {
    // Hardcoded credentials for demo
    if (username === "abishek_b" && password === "it@abishek55") {
      const userData = { username };
      setUser(userData);
      localStorage.setItem("portfolio-user", JSON.stringify(userData));
      toast.success("Login successful!");
      return true;
    } else {
      toast.error("Invalid credentials!");
      return false;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("portfolio-user");
    toast.success("Logged out successfully!");
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
