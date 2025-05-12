
import { cn } from "@/lib/utils";

interface SkillProps {
  name: string;
  level: number;
  className?: string;
}

const SkillCategory = ({ title, skills }: { title: string; skills: SkillProps[] }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {skills.map((skill, index) => (
        <div key={index} className="flex flex-col">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">{skill.name}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className={cn(
                "h-2 rounded-full", 
                skill.className || "bg-accent"
              )} 
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Skills = () => {
  const programmingLanguages = [
    { name: 'Python', level: 85 },
    { name: 'Java', level: 75 }
  ];
  
  const webDevelopment = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 85 },
    { name: 'JavaScript', level: 80 }
  ];
  
  const databases = [
    { name: 'SQL', level: 75 },
    { name: 'MongoDB', level: 70 }
  ];
  
  const versionControl = [
    { name: 'Git/GitHub', level: 80 }
  ];

  return (
    <section id="skills" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="section-heading">My Skills</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <SkillCategory title="Programming Languages" skills={programmingLanguages} />
            <SkillCategory title="Web Development" skills={webDevelopment} />
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <SkillCategory title="Databases" skills={databases} />
            <SkillCategory title="Version Control" skills={versionControl} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
