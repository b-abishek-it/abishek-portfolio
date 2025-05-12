
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
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
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      
      <footer className="bg-primary py-6">
        <div className="container text-center text-white text-sm">
          © 2025 Abishek. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
