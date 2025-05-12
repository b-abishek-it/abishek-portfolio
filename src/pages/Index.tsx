
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "Abishek B | Portfolio";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      
      <footer className="bg-primary text-primary-foreground py-6">
        <div className="container text-center">
          <p>© {new Date().getFullYear()} Abishek B. All rights reserved.</p>
          <p className="text-sm mt-1 text-primary-foreground/80">
            Full Stack Developer | Prompt Engineer
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
