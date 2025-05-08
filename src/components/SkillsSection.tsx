
import React from "react";

const SkillsSection: React.FC = () => {
  const skills = [
    "React", 
    "MERN Stack", 
    "TypeScript", 
    "Responsive Design",
    "Tailwind CSS", 
    "Node.js", 
    "Prompt Engineering", 
    "API Integration"
  ];
  
  const categories = {
    "Programming Languages": ["Python", "Java"],
    "Web Development": ["HTML", "CSS", "JavaScript"],
    "Databases": ["SQL", "MongoDB"],
    "Version Control": ["Git/GitHub"]
  };
  
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mx-auto mb-12">My Skills</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {Object.entries(categories).map(([category, categorySkills]) => (
            <div 
              key={category} 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4 text-portfolio-primary">{category}</h3>
              <ul className="space-y-2">
                {categorySkills.map(skill => (
                  <li key={skill} className="flex items-center">
                    <div className="w-2 h-2 bg-portfolio-primary rounded-full mr-2"></div>
                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <span 
              key={skill} 
              className="skill-badge"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
