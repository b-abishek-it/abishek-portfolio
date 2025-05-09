
import React from "react";
import { Button } from "@/components/ui/button";

const HomeSection: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 pb-0">
      <div className="container mx-auto px-6 py-16 flex flex-col items-center">
        <div className="w-full text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="block">Hi, I'm</span>
            <span className="text-portfolio-primary">Abishek B</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl font-medium mb-6 text-gray-700 dark:text-gray-300">
            Full Stack Developer | Prompt Engineer
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Crafting innovative digital solutions with modern technologies.
          </p>
          
          <div className="flex justify-center space-x-4">
            <a href="#about">
              <Button>
                Explore My Work
              </Button>
            </a>
            <a href="#contact">
              <Button variant="outline">Get In Touch</Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Removed the bouncing arrow at the bottom */}
    </section>
  );
};

export default HomeSection;
