
import React from "react";

type Education = {
  id: number;
  degree: string;
  institution: string;
  period: string;
  marks: string;
};

const EducationSection: React.FC = () => {
  const educationList: Education[] = [
    {
      id: 1,
      degree: "B.Tech Information Technology",
      institution: "Anjalai Ammal Mahalingam Engineering College, Kovilvenni",
      period: "Currently Studying (2022-2026)",
      marks: "Current CGPA: 8.02"
    },
    {
      id: 2,
      degree: "HSE - 12th Standard",
      institution: "Government Higher Secondary School, Ayyempettai",
      period: "Year of Passing: (2021-2022)",
      marks: "Marks Percentage: 72.6%"
    },
    {
      id: 3,
      degree: "SSLC - 10th Standard",
      institution: "Government Higher Secondary School, Ayyempettai",
      period: "Year of Passing: (2019-2020)",
      marks: "Marks Percentage: 88.8%"
    }
  ];
  
  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mx-auto mb-12">Education</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-portfolio-primary pl-10 pb-6">
            {educationList.map((edu, index) => (
              <div 
                key={edu.id}
                className="mb-10 relative animate-slide-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline node */}
                <div className="absolute -left-[42px] top-0 w-8 h-8 bg-portfolio-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{edu.id}</span>
                </div>
                
                {/* Content */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-portfolio-dark dark:text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {edu.institution}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {edu.period}
                  </p>
                  <p className="text-portfolio-primary font-medium">
                    {edu.marks}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
