
import React from "react";
import { useData } from "@/contexts/DataContext";
import { Badge } from "@/components/ui/badge";
import { BookText } from "lucide-react";

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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div 
              key={category} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-portfolio-primary/10 rounded-full">
                  <BookText className="w-5 h-5 text-portfolio-primary" />
                </div>
                <h3 className="text-xl font-bold">{category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categorySkills.map(skill => (
                  <Badge 
                    key={skill} 
                    variant="outline"
                    className="px-3 py-1 text-sm font-medium bg-gray-50 dark:bg-gray-700 border-portfolio-primary/30"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
