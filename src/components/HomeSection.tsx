
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HomeSection: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 pb-0">
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8 animate-fade-in">
          {/* Profile image */}
          <div className="relative mb-6 md:mb-0 w-64 h-64 mx-auto md:mx-0 overflow-hidden rounded-full border-4 border-portfolio-primary shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500" 
              alt="Abishek B Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-portfolio-primary/30 to-transparent" />
          </div>
        </div>
        
        <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
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
          
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#about">
              <Button className="flex items-center gap-2">
                Explore My Work <ArrowDown size={16} />
              </Button>
            </a>
            <a href="#contact">
              <Button variant="outline">Get In Touch</Button>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md">
          <ArrowDown size={20} className="text-portfolio-primary" />
        </a>
      </div>
    </section>
  );
};

export default HomeSection;
