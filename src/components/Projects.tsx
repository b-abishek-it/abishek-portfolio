
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
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
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
      image: "/weather.JPG",
      codeLink: "https://github.com/b-abishek-it/weather-app",
      demoLink: "https://weather-app-teal-omega-82.vercel.app/"
    },
    {
      title: "Todo List App",
      description: "A simple React-based app to manage daily tasks. Users can add, complete, and delete todos easily.",
      image: "/todo.JPG",
      codeLink: "https://github.com/b-abishek-it/To-Do-List",
      demoLink: "https://to-do-list-orcin-eight-84.vercel.app/"
    },
    {
      title: "Passport Automation System",
      description: "A React-based web application for applying, tracking, and managing passport services. It streamlines the process for users, police, and officers.",
      image: "/passport.JPG",
      codeLink: "https://github.com/b-abishek-it/passport-pathway-system",
      demoLink: "https://passport-automation-system-eta.vercel.app/"
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
