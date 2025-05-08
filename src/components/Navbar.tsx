
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  
  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Close mobile menu when clicking a nav link
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow dark:bg-gray-900" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-bold text-portfolio-dark dark:text-white hover:text-portfolio-accent transition-colors"
          >
            Abishek B
          </Link>
          
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-portfolio-dark dark:text-gray-200 dark:hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        <div 
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } md:block mt-4 md:mt-0 transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col md:flex-row md:items-center">
            {/* Navigation Links */}
            <a 
              href="#home" 
              className="my-2 md:mx-4 md:my-0 text-sm font-medium text-gray-700 hover:text-portfolio-primary dark:text-gray-200 dark:hover:text-portfolio-primary transition-colors"
              onClick={handleNavClick}
            >
              Home
            </a>
            <a 
              href="#about" 
              className="my-2 md:mx-4 md:my-0 text-sm font-medium text-gray-700 hover:text-portfolio-primary dark:text-gray-200 dark:hover:text-portfolio-primary transition-colors"
              onClick={handleNavClick}
            >
              About
            </a>
            <a 
              href="#education" 
              className="my-2 md:mx-4 md:my-0 text-sm font-medium text-gray-700 hover:text-portfolio-primary dark:text-gray-200 dark:hover:text-portfolio-primary transition-colors"
              onClick={handleNavClick}
            >
              Education
            </a>
            <a 
              href="#skills" 
              className="my-2 md:mx-4 md:my-0 text-sm font-medium text-gray-700 hover:text-portfolio-primary dark:text-gray-200 dark:hover:text-portfolio-primary transition-colors"
              onClick={handleNavClick}
            >
              Skills
            </a>
            <a 
              href="#projects" 
              className="my-2 md:mx-4 md:my-0 text-sm font-medium text-gray-700 hover:text-portfolio-primary dark:text-gray-200 dark:hover:text-portfolio-primary transition-colors"
              onClick={handleNavClick}
            >
              Projects
            </a>
            <a 
              href="#achievements" 
              className="my-2 md:mx-4 md:my-0 text-sm font-medium text-gray-700 hover:text-portfolio-primary dark:text-gray-200 dark:hover:text-portfolio-primary transition-colors"
              onClick={handleNavClick}
            >
              Achievements
            </a>
            <a 
              href="#contact" 
              className="my-2 md:mx-4 md:my-0 text-sm font-medium text-gray-700 hover:text-portfolio-primary dark:text-gray-200 dark:hover:text-portfolio-primary transition-colors"
              onClick={handleNavClick}
            >
              Contact
            </a>
            
            {/* Login/Dashboard button */}
            {isAuthenticated ? (
              <div className="flex gap-2 md:ml-2 mt-4 md:mt-0">
                <Link to="/dashboard">
                  <Button variant="outline" className="text-sm" onClick={handleNavClick}>
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" className="text-sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" className="md:ml-2 mt-4 md:mt-0">
                <Button variant="outline" className="text-sm" onClick={handleNavClick}>
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
