
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 10);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full py-4 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 shadow-md backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="container flex justify-between items-center">
        <div className="text-xl font-bold font-heading text-accent">ABISHEK B</div>
        
        <div className="hidden md:flex space-x-8">
          {['Home', 'About', 'Skills', 'Projects', 'Achievements', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={cn(
                "text-sm font-medium hover:text-accent transition-colors",
                activeSection === item.toLowerCase() ? "text-accent" : "text-foreground"
              )}
            >
              {item}
            </button>
          ))}
        </div>
        
        <div className="md:hidden">
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
