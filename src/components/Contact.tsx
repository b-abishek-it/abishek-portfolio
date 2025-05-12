
import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactItem = ({ 
  icon, 
  label, 
  link 
}: { 
  icon: React.ReactNode; 
  label: string; 
  link: string;
}) => {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
    >
      <div className="p-3 rounded-full bg-accent/10 text-accent mr-4">
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </a>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="section-heading">Contact Me</h2>
        
        <div className="max-w-xl mx-auto space-y-4">
          <ContactItem 
            icon={<Mail size={24} />}
            label="Email" 
            link="mailto:itabishek7@gmail.com"
          />
          
          <ContactItem 
            icon={<Github size={24} />}
            label="GitHub" 
            link="https://github.com/b-abishek-it" 
          />
          
          <ContactItem 
            icon={<Linkedin size={24} />}
            label="LinkedIn" 
            link="https://www.linkedin.com/in/abishek-b-89ab77313?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
          />
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground">Let's work together on your next project!</p>
          <Button
            className="mt-4 bg-accent hover:bg-accent/90"
            onClick={() => window.location.href = "mailto:itabishek7@gmail.com"}
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
