
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { X, Menu } from 'lucide-react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 10);
      
      // Update active section based on scroll position
      const sections = ['about', 'skills', 'projects', 'achievements', 'contact'];
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
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const navItems = ['About', 'Skills', 'Projects', 'Achievements', 'Contact'];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full py-4 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="container flex justify-between items-center">
        <div className="text-xl font-bold font-heading text-accent dark:text-accent">ABISHEK B</div>
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={cn(
                "text-sm font-medium hover:text-accent transition-colors",
                activeSection === item.toLowerCase() ? "text-accent" : "text-foreground dark:text-white"
              )}
            >
              {item}
            </button>
          ))}
        </div>
        
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && isMobile && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-sm">
          <div className="py-4 flex flex-col">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={cn(
                  "py-3 px-8 text-left text-sm font-medium hover:bg-accent/10 hover:text-accent transition-colors",
                  activeSection === item.toLowerCase() ? "text-accent" : "text-foreground dark:text-white"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
