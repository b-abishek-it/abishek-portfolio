
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SkillProps {
  name: string;
  level: number;
  className?: string;
}

const SkillCategory = ({ title, skills }: { title: string; skills: SkillProps[] }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-4 text-foreground">{title}</h3>
    <div className="grid grid-cols-1 gap-4">
      {skills.map((skill, index) => (
        <div key={index} className="flex flex-col bg-white/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between mb-2">
            <span className="font-medium">{skill.name}</span>
            <Badge variant="outline" className="bg-accent/10 text-accent">
              {skill.level}%
            </Badge>
          </div>
          <div className="w-full bg-secondary/30 rounded-full h-3">
            <div 
              className={cn(
                "h-3 rounded-full bg-gradient-to-r from-accent/60 to-accent", 
                skill.className
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
    { name: 'Python', level: 60 },
    { name: 'Java', level: 40 }
  ];
  
  const webDevelopment = [
    { name: 'HTML', level: 70 },
    { name: 'CSS', level: 50 },
    { name: 'JavaScript', level: 50 }
  ];
  
  const databases = [
    { name: 'SQL', level: 50 },
    { name: 'MongoDB', level: 40 }
  ];
  
  const versionControl = [
    { name: 'Git/GitHub', level: 50 }
  ];

  return (
    <section id="skills" className="py-16 px-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto">
        <h2 className="section-heading">My Skills</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <SkillCategory title="Programming Languages" skills={programmingLanguages} />
            <SkillCategory title="Web Development" skills={webDevelopment} />
          </div>
          
          <div className="space-y-6">
            <SkillCategory title="Databases" skills={databases} />
            <SkillCategory title="Version Control" skills={versionControl} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
