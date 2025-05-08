
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { toast } from "sonner";

const ContactSection: React.FC = () => {
  const { addMessage } = useData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addMessage({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      date: new Date().toISOString(),
      read: false
    });
    
    toast.success("Message sent successfully!");
    
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };
  
  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mx-auto mb-12">Get In Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-portfolio-dark dark:text-white">Contact Info</h3>
            
            <div className="space-y-6">
              <a 
                href="mailto:abishek@example.com" 
                className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-portfolio-primary transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-portfolio-primary/10 flex items-center justify-center text-portfolio-primary">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-sm">abishek@example.com</p>
                </div>
              </a>
              
              <a 
                href="https://github.com/abishek-b" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-portfolio-primary transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-portfolio-primary/10 flex items-center justify-center text-portfolio-primary">
                  <Github size={22} />
                </div>
                <div>
                  <h4 className="font-medium">GitHub</h4>
                  <p className="text-sm">github.com/abishek-b</p>
                </div>
              </a>
              
              <a 
                href="https://linkedin.com/in/abishek-b" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-portfolio-primary transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-portfolio-primary/10 flex items-center justify-center text-portfolio-primary">
                  <Linkedin size={22} />
                </div>
                <div>
                  <h4 className="font-medium">LinkedIn</h4>
                  <p className="text-sm">linkedin.com/in/abishek-b</p>
                </div>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-portfolio-dark dark:text-white">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
