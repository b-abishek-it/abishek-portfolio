
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface SkillProps {
  name: string;
  level: number;
  description?: string;
  className?: string;
}

const SkillCategory = ({ title, skills }: { title: string; skills: SkillProps[] }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-4 text-foreground">{title}</h3>
    <div className="grid grid-cols-1 gap-4">
      {skills.map((skill, index) => (
        <HoverCard key={index}>
          <HoverCardTrigger asChild>
            <div className="flex flex-col bg-white/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <Badge variant="outline" className="bg-accent/10 text-accent">
                  {skill.level}%
                </Badge>
              </div>
              <div className="w-full bg-secondary/30 rounded-full h-3">
                <div 
                  className={cn(
                    "h-3 rounded-full bg-gradient-to-r from-accent/60 to-accent transition-all duration-1000", 
                    skill.className
                  )} 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{skill.name}</h4>
              <p className="text-sm text-muted-foreground">
                {skill.description || `Experience with ${skill.name} includes various projects and applications.`}
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  </div>
);

const Skills = () => {
  const programmingLanguages = [
    { name: 'Python', level: 60, description: 'Experience with data analysis, scripting, and automation.' },
    { name: 'Java', level: 40, description: 'Knowledge of object-oriented programming concepts and application development.' }
  ];
  
  const webDevelopment = [
    { name: 'HTML', level: 70, description: 'Strong fundamentals in semantic markup and structure.' },
    { name: 'CSS', level: 50, description: 'Experience with responsive design, Flexbox, Grid, and animations.' },
    { name: 'JavaScript', level: 50, description: 'Knowledge of core concepts, DOM manipulation, and modern ES6+ features.' }
  ];
  
  const databases = [
    { name: 'SQL', level: 50, description: 'Experience with relational database design and query optimization.' },
    { name: 'MongoDB', level: 40, description: 'Knowledge of NoSQL database concepts and data modeling.' }
  ];
  
  const versionControl = [
    { name: 'Git/GitHub', level: 50, description: 'Proficient in version control workflows, branching, and collaboration.' }
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
