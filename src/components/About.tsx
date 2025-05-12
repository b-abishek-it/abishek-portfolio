
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

const About = () => {
  const [showResume, setShowResume] = useState(false);
  const [showProfileImage, setShowProfileImage] = useState(false);
  
  const openResume = () => {
    setShowResume(true);
  };

  return (
    <section id="about" className="min-h-screen pt-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="section-heading">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div 
              className="rounded-lg overflow-hidden shadow-xl w-64 h-68 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setShowProfileImage(true)}
            >
              {/* Passport size photo */}
              <img 
                src="public/pic.png" 
                alt="Abishek B" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:col-span-8">
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">
              Hello, I'm <span className="text-accent">Abishek B</span>
            </h1>
            <h4 className="text-xl text-muted-foreground mb-4">Full Stack Developer | Prompt Engineer</h4>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm currently pursuing a degree in Information Technology Engineering. I'm passionate about coding, 
                building innovative projects, and learning technologies like React and the MERN stack.
              </p>
              
              <p>
                I'm also exploring prompt engineering to better utilize AI tools like ChatGPT, combining traditional 
                development skills with emerging AI technologies to create more efficient and intelligent solutions.
              </p>
            </div>
            
            <Button onClick={openResume} className="mt-6 bg-accent hover:bg-accent/90">
              View Resume
            </Button>
          </div>
        </div>
      </div>
      
      {/* Resume Dialog */}
      <Dialog open={showResume} onOpenChange={setShowResume}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>My Resume</DialogTitle>
          </DialogHeader>
          <div className="h-full">
            <iframe 
              src="/public/resume.pdf" 
              className="w-full h-full border-0"
              title="Resume"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Profile Image Dialog */}
      <Dialog open={showProfileImage} onOpenChange={setShowProfileImage}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Abishek B</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <div className="rounded-lg overflow-hidden shadow-xl max-w-full">
              <img 
                src="/profile.jpg" 
                alt="Abishek B" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default About;
