
import React from "react";
import { useData } from "@/contexts/DataContext";
import { Badge } from "@/components/ui/badge";

const SkillsSection: React.FC = () => {
  const { skills } = useData();
  
  // Group skills by category
  const skillsByCategory = skills.reduce((acc: Record<string, string[]>, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {});
  
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mx-auto mb-12">My Skills</h2>
        
        {/* Category boxes with glass effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div 
              key={category} 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all hover:shadow-xl"
            >
              <h3 className="text-xl font-bold mb-4 text-portfolio-primary border-b pb-2 border-portfolio-primary/30">{category}</h3>
              <ul className="space-y-3">
                {categorySkills.map(skill => (
                  <li key={skill} className="flex items-center">
                    <div className="w-2 h-2 bg-portfolio-accent rounded-full mr-2"></div>
                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Skill badges - Removed the predefined display skills */}
        <div className="flex flex-wrap justify-center gap-4">
          {skills.slice(0, 8).map((skill) => (
            <Badge 
              key={skill.id} 
              variant="outline"
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-portfolio-primary/20 to-portfolio-accent/20 border border-portfolio-primary/30 hover:bg-portfolio-primary/30 transition-colors duration-300"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
