
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";

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
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Add message to the data context
    addMessage({
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
      date: new Date().toISOString(),
      read: false
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: ""
    });
    
    toast.success("Message sent successfully!");
  };
  
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mx-auto mb-12">Get In Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-portfolio-dark dark:text-white">Let's Connect</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out through any of the channels below.
            </p>
            
            <div className="space-y-4">
              <a 
                href="mailto:your-email@example.com" 
                className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-portfolio-primary dark:hover:text-portfolio-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-portfolio-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-portfolio-primary" />
                </div>
                <span>your-email@example.com</span>
              </a>
              
              <a 
                href="https://github.com/your-username" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-portfolio-primary dark:hover:text-portfolio-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-portfolio-primary/10 flex items-center justify-center">
                  <Github className="w-5 h-5 text-portfolio-primary" />
                </div>
                <span>github.com/your-username</span>
              </a>
              
              <a 
                href="https://linkedin.com/in/your-username" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-portfolio-primary dark:hover:text-portfolio-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-portfolio-primary/10 flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-portfolio-primary" />
                </div>
                <span>linkedin.com/in/your-username</span>
              </a>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-portfolio-primary focus:border-transparent dark:bg-gray-800"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-portfolio-primary focus:border-transparent dark:bg-gray-800"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-portfolio-primary focus:border-transparent dark:bg-gray-800"
                  required
                ></textarea>
              </div>
              
              <Button type="submit" className="w-full flex items-center justify-center gap-2">
                <Send size={16} /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
