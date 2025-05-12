
import { Button } from "@/components/ui/button";

const About = () => {
  const openResume = () => {
    // Create a link to open the PDF in a new tab
    // Replace with actual PDF path when it's available
    window.open('/resume.pdf', '_blank');
  };

  return (
    <section id="about" className="min-h-screen pt-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="section-heading">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="rounded-lg overflow-hidden shadow-xl w-64 h-68">
              {/* Replace with actual image when available */}
              <div className="bg-accent/20 w-full h-full flex items-center justify-center text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
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
    </section>
  );
};

export default About;
