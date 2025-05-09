
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeSwitch from "./ThemeSwitch";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Check if we're on the main page
  const isMainPage = location.pathname === "/";
  
  // Links to show in the navbar (removed "Home")
  const navLinks = [
    { name: "About", path: "#about" },
    { name: "Education", path: "#education" },
    { name: "Skills", path: "#skills" },
    { name: "Projects", path: "#projects" },
    { name: "Achievements", path: "#achievements" },
    { name: "Contact", path: "#contact" }
  ];
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close menu when clicking a link (mobile)
  const handleLinkClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-portfolio-dark dark:text-white">
            Abishek<span className="text-portfolio-primary">.dev</span>
          </a>
          
          <div className="flex items-center space-x-4">
            <ThemeSwitch />
            
            {/* Mobile menu button */}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            )}
            
            {/* Desktop navigation */}
            {!isMobile && isMainPage && (
              <div className="hidden lg:flex items-center space-x-2">
                {navLinks.map(link => (
                  <a 
                    key={link.name} 
                    href={link.path}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-portfolio-primary dark:text-gray-300 dark:hover:text-white transition-colors"
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </a>
                ))}
                <a href="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </a>
              </div>
            )}
            
            {!isMobile && !isMainPage && (
              <a href="/">
                <Button variant="outline" size="sm">Back to Portfolio</Button>
              </a>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <div className="lg:hidden mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 absolute left-4 right-4 z-50">
            <div className="flex flex-col space-y-2">
              {isMainPage && navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.path}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  onClick={handleLinkClick}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="/login"
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                onClick={handleLinkClick}
              >
                Login
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
