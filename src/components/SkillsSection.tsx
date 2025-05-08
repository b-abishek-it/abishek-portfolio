
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Skill = {
  name: string;
  level: number;
};

type SkillCategory = {
  name: string;
  id: string;
  skills: Skill[];
};

const SkillsSection: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      name: "Programming Languages",
      id: "programming",
      skills: [
        { name: "Python", level: 80 },
        { name: "Java", level: 75 }
      ]
    },
    {
      name: "Web Development",
      id: "web",
      skills: [
        { name: "HTML", level: 90 },
        { name: "CSS", level: 85 },
        { name: "JavaScript", level: 80 }
      ]
    },
    {
      name: "Databases",
      id: "db",
      skills: [
        { name: "SQL", level: 70 },
        { name: "MongoDB", level: 65 }
      ]
    },
    {
      name: "Version Control",
      id: "vc",
      skills: [
        { name: "Git/GitHub", level: 85 }
      ]
    }
  ];
  
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mx-auto mb-12">My Skills</h2>
        
        <Tabs defaultValue="programming" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            {skillCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {skillCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.skills.map((skill, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-semibold text-portfolio-dark dark:text-white">
                        {skill.name}
                      </h4>
                      <span className="text-sm text-portfolio-primary">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-portfolio-primary h-2.5 rounded-full transition-all duration-1000 ease-in-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="flex flex-wrap justify-center gap-2 mt-12">
          <span className="skill-badge">React</span>
          <span className="skill-badge">MERN Stack</span>
          <span className="skill-badge">TypeScript</span>
          <span className="skill-badge">Responsive Design</span>
          <span className="skill-badge">Tailwind CSS</span>
          <span className="skill-badge">Node.js</span>
          <span className="skill-badge">Prompt Engineering</span>
          <span className="skill-badge">API Integration</span>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
