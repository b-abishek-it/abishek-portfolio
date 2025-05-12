
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center pt-16 pb-8 px-4"
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">
            Hello, I'm <span className="text-accent">Abishek B</span>
          </h1>
          <h2 className="text-xl md:text-2xl mb-6 text-muted-foreground">
            Full Stack Developer | Prompt Engineer
          </h2>
          <p className="max-w-2xl text-center mb-8 text-muted-foreground">
            Building beautiful, responsive and functional web applications with modern technologies.
            Passionate about creating clean, efficient, and user-friendly solutions.
          </p>
          <div className="flex gap-4">
            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-accent hover:bg-accent/90"
            >
              Contact Me
            </Button>
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
