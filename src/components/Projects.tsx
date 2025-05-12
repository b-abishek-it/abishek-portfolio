
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  codeLink: string;
  demoLink: string;
}

const ProjectCard = ({ project, index }: { project: ProjectProps; index: number }) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl",
        index % 2 === 0 ? "animate-fade-in" : "animate-slide-in"
      )}
    >
      <div className="aspect-video w-full bg-accent/10 flex items-center justify-center">
        {/* Replace with actual project image when available */}
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" x2="16" y1="21" y2="21"></line>
          <line x1="12" x2="12" y1="17" y2="21"></line>
        </svg>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex space-x-3">
          <Button size="sm" variant="outline" asChild>
            <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
              Code
            </a>
          </Button>
          <Button size="sm" className="bg-accent hover:bg-accent/90" asChild>
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects: ProjectProps[] = [
    {
      title: "Weather App",
      description: "A React-based app that fetches real-time weather data via API and displays it with a clean, responsive UI.",
      image: "/weather-app.jpg",
      codeLink: "#",
      demoLink: "#"
    },
    {
      title: "Todo List App",
      description: "A simple React-based app to manage daily tasks. Users can add, complete, and delete todos easily.",
      image: "/todo-app.jpg",
      codeLink: "#",
      demoLink: "#"
    },
    {
      title: "Passport Automation System",
      description: "A React-based web application for applying, tracking, and managing passport services. It streamlines the process for users, police, and officers.",
      image: "/passport-app.jpg",
      codeLink: "#",
      demoLink: "#"
    }
  ];

  return (
    <section id="projects" className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="section-heading">My Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
