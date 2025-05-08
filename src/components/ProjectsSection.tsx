
import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { useData, Project } from "@/contexts/DataContext";

const ProjectsSection: React.FC = () => {
  const { projects } = useData();
  
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mx-auto mb-12">My Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <div 
      className="project-card animate-fade-in" 
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-portfolio-dark dark:text-white">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="space-x-3">
            <a 
              href={project.codeLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-portfolio-primary hover:text-portfolio-secondary transition-colors"
            >
              <Github size={16} className="mr-1" /> Code
            </a>
            <a 
              href={project.demoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-portfolio-primary hover:text-portfolio-secondary transition-colors"
            >
              <ExternalLink size={16} className="mr-1" /> Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
