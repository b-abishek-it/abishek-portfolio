
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const AboutSection: React.FC = () => {
  const openResume = () => {
    // Replace this URL with the actual URL to your resume PDF
    const resumeUrl = "/resume.pdf";
    window.open(resumeUrl, "_blank");
  };
  
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mx-auto mb-12">About Me</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 animate-fade-in">
            <div className="overflow-hidden w-48 h-64 mx-auto shadow-md">
              <img 
                src="/lovable-uploads/4b0d0b38-5c30-4477-b06e-4e17f466b078.png" 
                alt="Abishek coding"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-semibold mb-4">Who Am I?</h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              I'm currently pursuing a degree in Information Technology Engineering. I'm passionate about coding, building innovative projects, and learning technologies like React and the MERN stack. I'm also exploring prompt engineering to better utilize AI tools like ChatGPT.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-portfolio-primary mr-3"></div>
                <p className="text-gray-700 dark:text-gray-300">Developing innovative web applications</p>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-portfolio-primary mr-3"></div>
                <p className="text-gray-700 dark:text-gray-300">Building full-stack solutions with modern technologies</p>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-portfolio-primary mr-3"></div>
                <p className="text-gray-700 dark:text-gray-300">Exploring AI and prompt engineering</p>
              </div>
            </div>
            
            <Button 
              className="flex items-center gap-2" 
              onClick={openResume}
            >
              <FileText size={18} />
              View Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
